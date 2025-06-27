import yaml
import os

# Load the canonical categories
with open('data/integration_categories.yaml', 'r') as f:
    canonical_categories = yaml.safe_load(f)['categories']

canonical_category_names = [details['name'] for details in canonical_categories.values()]

# Iterate over each integration file
for filename in os.listdir('data/integrations'):
    if filename.endswith('.yaml'):
        filepath = os.path.join('data/integrations', filename)
        with open(filepath, 'r') as f:
            integration = yaml.safe_load(f)

        if not integration or 'category' not in integration:
            continue

        current_categories = integration.get('category', [])
        if not isinstance(current_categories, list):
            current_categories = [current_categories]

        new_categories = set()
        for cat in current_categories:
            if cat in canonical_category_names:
                new_categories.add(cat)
                continue

            # Apply the correction logic
            if cat == 'Video':
                new_categories.add('Video Conferencing and Collaboration')
            elif cat == 'Sensors':
                if 'environmental_metrics' in integration.get('supportedFeatures', []):
                    new_categories.add('Environmental Sensors')
                if 'occupancy' in integration.get('supportedFeatures', []):
                    new_categories.add('Occupancy and Presence Detection')
            elif cat == 'AV Infrastructure' or cat == 'AV Systems':
                if 'video_stream' in integration.get('supportedFeatures', []):
                    new_categories.add('Video Conferencing and Collaboration')
                else:
                    new_categories.add('Audio Systems and DSPs')
            elif cat == 'Common Protocols/Standards' or cat == 'Protocols' or cat == 'Time Synchronization':
                new_categories.add('Communication Protocols')
            elif cat == 'Authentication' or cat == 'Directory Services':
                new_categories.add('Authentication and Identity Management')
            elif cat == 'Cameras':
                new_categories.add('Video Surveillance and Analytics')
            elif cat == 'Real Time Location':
                new_categories.add('Wireless Infrastructure')
            elif cat == 'Network':
                new_categories.add('Wired Infrastructure')
            elif cat == 'Video Conferencing' or cat == 'Unified Collaboration':
                new_categories.add('Video Conferencing and Collaboration')
            elif cat == 'Audio':
                new_categories.add('Audio Systems and DSPs')
            elif cat == 'Lighting':
                new_categories.add('Lighting Control Systems')
            elif cat == 'Facilities Management':
                new_categories.add('Building Management Systems')
            elif cat == 'Video over IP':
                new_categories.add('Video Conferencing and Collaboration')
            elif cat == 'Resource Booking':
                new_categories.add('Resource Booking Systems')
            elif cat == 'Energy':
                new_categories.add('Energy Management and Metering')
            elif cat == 'Building Access Control Systems':
                new_categories.add('Building Access Control Systems')
            elif cat == 'Messaging':
                new_categories.add('Messaging and Notification Systems')
            elif cat == 'Other':
                pass # Skip 'Other' for now, as per our discussion
            else:
                new_categories.add(cat) # Keep unrecognized categories for now

        integration['category'] = sorted(list(new_categories))

        with open(filepath, 'w') as f:
            yaml.dump(integration, f, default_flow_style=False, sort_keys=False)

print("Category correction script finished.")
