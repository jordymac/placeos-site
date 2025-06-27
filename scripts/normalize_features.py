#!/usr/bin/env python3
"""
Script to normalize feature names in integration YAML files.
Standardizes similar feature names to consistent canonical forms.
"""

import os
import yaml
import glob
from typing import Dict, List, Any

# Comprehensive normalization mapping
FEATURE_NORMALIZATION = {
    # People counting variations
    "People counting": "People Count",
    "Occupancy (headcount)": "People Count",
    "Footfall metrics": "People Count",
    
    # Occupancy variations
    "Presence detection": "Occupancy",
    "Occupancy detection": "Occupancy",
    "Occupancy status": "Occupancy",
    "Real-time presence detection": "Occupancy",
    "Zone occupancy": "Occupancy",
    "Occupancy indicators": "Occupancy",
    "Occupancy triggers": "Occupancy",
    "Occupancy state": "Occupancy",
    "Presence events": "Occupancy",
    "Device presence": "Occupancy",
    "Desk occupancy": "Occupancy",
    "Room occupancy": "Occupancy",
    "Presence state": "Occupancy",
    "occupancy": "Occupancy",  # Casing fix
    "motion": "Motion Detection",  # Casing fix
    
    # Space utilization variations
    "Occupancy trends": "Space Utilization",
    "Occupancy heatmaps": "Space Utilization",
    "Live heatmaps": "Space Utilization",
    "Zone-based analytics": "Space Utilization",
    "Zone usage patterns": "Space Utilization",
    "Space utilization trends": "Space Utilization",
    "Zone analytics": "Space Utilization",
    "Zone-level usage": "Space Utilization",
    "Usage patterns": "Space Utilization",
    "Room usage metrics": "Space Utilization",
    "Occupancy heatmap": "Space Utilization",
    
    # Dwell time variations
    "Zone dwell time": "Dwell Time",
    
    # Entry/exit events variations
    "Zone entry/exit": "Entry/Exit Events",
    "Entry/exit events": "Entry/Exit Events",
    "Door access events": "Entry/Exit Events",
    "Access events": "Entry/Exit Events",
    "Access-grant/deny events": "Entry/Exit Events",
    
    # Location tracking variations
    "Movement trails": "Location Tracking",
    "Client MAC addresses": "Location Tracking",
    "MAC address tracking": "Location Tracking",
    "Estimated coordinates": "Location Tracking",
    "Location coordinates": "Location Tracking",
    "Location zones": "Location Tracking",
    "Real-time location updates": "Location Tracking",
    "BLE beacon events": "Location Tracking",
    "Access point association": "Location Tracking",
    "RSSI values": "Location Tracking",
    "Signal strength (RSSI)": "Location Tracking",
    "Beacon IDs": "Location Tracking",
    "Access point associations": "Location Tracking",
    "RSSI and location estimation": "Location Tracking",
    "MAC address presence": "Location Tracking",
    
    # API-related normalizations
    "API relay status": "API Status",
    "Relay state": "API Status",
    "API request/response logs": "API Logs",
    "Prompt/response logs": "API Logs",
    "Request/response logs": "API Logs",
    "API responses": "API Response",
    "Response codes": "API Response",
    "Response metadata": "API Response",
    "Socket responses": "API Response",
    
    # Access control normalizations
    "Access logs": "Access Logs",
    "Calendar access logs": "Access Logs",
    "Network access logs": "Access Logs",
    "Access timestamp": "Access Events",
    "Door open/close event": "Entry/Exit Events",
    
    # Door state normalizations
    "Door state": "Door Status",
    "Door state (open/closed/locked)": "Door Status",
    "Door states": "Door Status",
    
    # Air quality normalizations
    "Air quality": "Air Quality",
    "Air quality index": "Air Quality Index",
    
    # Camera/video normalizations
    "Camera health": "Camera Status",
    "Camera state": "Camera Status",
    "video_stream": "Video Stream",  # Casing fix
    "Stream URL": "Video Stream",
    "Live stream URLs": "Video Stream",
    "Video feed status": "Video Status",
    "Video signal status": "Video Status",
    
    # Stream management
    "Stream availability": "Stream Status",
    "Stream quality": "Stream Status",
    "Stream routing": "Stream Status",
    "Streaming status": "Stream Status",
    
    # Call-related normalizations
    "Call activity": "Call Events",
    "Call logs": "Call Logs",
    
    # Alarm normalizations
    "Alarm events": "Alarm Events",
    "Alarm state": "Alarm Status",
    "Alarm status": "Alarm Status",
    "Alert events": "Alarm Events",
    "Alert notifications": "Alarm Events",
    
    # Device status normalizations
    "Device connectivity": "Connection Status",
    "Device connection status": "Connection Status",
    "Power state": "Power Status",
    "Battery state": "Battery Status",
    "System health": "System Status",
    "Device health": "Device Status",
    
    # Motion detection normalizations
    "Motion events": "Motion Detection",
    "Signal detection": "Motion Detection",
    "Signal presence": "Motion Detection",
    
    # Credential normalizations
    "Credential management": "Credentials",
    "Credential matching": "Credentials",
    "Credential status": "Credentials",
    "Credential validation": "Credentials",
    "User credentials": "Credentials",
}

def normalize_feature_name(feature: str) -> str:
    """Normalize a feature name using the mapping."""
    return FEATURE_NORMALIZATION.get(feature, feature)

def normalize_yaml_file(file_path: str) -> bool:
    """Normalize feature names in a single YAML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        if not data or 'common_data_available' not in data:
            return False
        
        # Track if any changes were made
        changed = False
        
        # Normalize the common_data_available list
        if isinstance(data['common_data_available'], list):
            normalized_features = []
            for feature in data['common_data_available']:
                if isinstance(feature, str):
                    normalized = normalize_feature_name(feature)
                    if normalized != feature:
                        changed = True
                        print(f"  {file_path}: '{feature}' -> '{normalized}'")
                    normalized_features.append(normalized)
                else:
                    normalized_features.append(feature)
            
            data['common_data_available'] = normalized_features
        
        # Write back if changes were made
        if changed:
            with open(file_path, 'w', encoding='utf-8') as f:
                yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
            return True
        
        return False
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function to normalize all integration YAML files."""
    integrations_dir = "/Users/placeos/Desktop/placeos/data/integrations"
    yaml_files = glob.glob(os.path.join(integrations_dir, "*.yaml"))
    
    print(f"Processing {len(yaml_files)} integration files...")
    
    changed_files = 0
    total_changes = 0
    
    for yaml_file in sorted(yaml_files):
        if normalize_yaml_file(yaml_file):
            changed_files += 1
    
    print(f"\nNormalization complete!")
    print(f"Modified {changed_files} files")

if __name__ == "__main__":
    main()