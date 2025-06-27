#!/usr/bin/env python3
"""
Script to remove duplicate feature names in integration YAML files.
"""

import os
import yaml
import glob

def deduplicate_yaml_file(file_path: str) -> bool:
    """Remove duplicate feature names in a single YAML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        if not data or 'common_data_available' not in data:
            return False
        
        # Track if any changes were made
        changed = False
        
        # Remove duplicates while preserving order
        if isinstance(data['common_data_available'], list):
            original_features = data['common_data_available']
            seen = set()
            deduplicated_features = []
            
            for feature in original_features:
                if feature not in seen:
                    deduplicated_features.append(feature)
                    seen.add(feature)
                else:
                    changed = True
            
            if changed:
                data['common_data_available'] = deduplicated_features
                print(f"  {file_path}: Removed {len(original_features) - len(deduplicated_features)} duplicates")
        
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
    """Main function to deduplicate all integration YAML files."""
    integrations_dir = "/Users/placeos/Desktop/placeos/data/integrations"
    yaml_files = glob.glob(os.path.join(integrations_dir, "*.yaml"))
    
    print(f"Processing {len(yaml_files)} integration files for deduplication...")
    
    changed_files = 0
    
    for yaml_file in sorted(yaml_files):
        if deduplicate_yaml_file(yaml_file):
            changed_files += 1
    
    print(f"\nDeduplication complete!")
    print(f"Modified {changed_files} files")

if __name__ == "__main__":
    main()