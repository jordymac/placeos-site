import pathlib
import yaml

# Paths
PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent
INTEGRATIONS_DIR = PROJECT_ROOT / "data" / "integrations"
OUTPUT_FILE = PROJECT_ROOT / "data" / "feature_list.yaml"

# Collect supportedFeatures
features_set = set()
for filepath in INTEGRATIONS_DIR.glob("*.yaml"):
    try:
        data = yaml.safe_load(filepath.read_text())
        feats = data.get("supportedFeatures", [])
        for f in feats:
            features_set.add(f)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

# Sort features
features_list = sorted(features_set)

# Build output structure
feature_list_doc = {"features": {f: {"description": ""} for f in features_list}}

# Write to YAML
OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
with open(OUTPUT_FILE, "w") as f:
    yaml.dump(feature_list_doc, f, sort_keys=True)

print(f"→ Generated feature list with {len(features_list)} features to {OUTPUT_FILE}")
