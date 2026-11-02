import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Project } from '../types';

interface ProjectMapProps {
  projects: Project[];
}

export const ProjectMap: React.FC<ProjectMapProps> = ({ projects }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const projectCoords: { [key: string]: [number, number] } = {
    'القاهرة الجديدة': [30.0444, 31.4500],
    'العاصمة الإدارية': [30.0131, 31.4925],
    'القرية الذكية - الجيزة': [30.0715, 31.0210],
    'وسط البلد - القاهرة': [30.0444, 31.2357],
    'التجمع الخامس': [30.0270, 31.4120],
    'الإسكندرية': [31.2001, 29.9187]
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map centered on Cairo
      const map = L.map(mapContainerRef.current, {
        center: [30.0444, 31.2357],
        zoom: 9,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          })
        ]
      });
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers for each project
    projects.forEach((p) => {
      const coords = projectCoords[p.location] || [30.0444 + Math.random() * 0.1, 31.2357 + Math.random() * 0.1];
      
      const markerHtml = `<div style="background: ${p.status === 'مكتملة' ? '#10b981' : '#3b82f6'}; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">${p.progress}%</div>`;
      
      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(coords, { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="direction: rtl; font-family: 'Cairo', sans-serif; text-align: right; padding: 4px;">
          <h4 style="font-weight: bold; font-size: 14px; margin-bottom: 4px; color: #1e3a8a;">${p.name}</h4>
          <p style="font-size: 12px; margin: 2px 0;">التخصص: ${p.category}</p>
          <p style="font-size: 12px; margin: 2px 0;">الموقع: ${p.location}</p>
          <p style="font-size: 12px; margin: 2px 0; font-weight: bold; color: #10b981;">نسبة الإنجاز: ${p.progress}%</p>
        </div>
      `);
    });

    return () => {
      // Cleanup if needed
    };
  }, [projects]);

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative z-10">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
