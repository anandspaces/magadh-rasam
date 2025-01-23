import json
from api.models import Menu, Category

# Load JSON data
file_path = 'data/menu_data.json'
try:
    with open(file_path, 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print(f"File {file_path} not found.")


# Insert data into the database
menu_objects = []
for item in data:
    try:
        category = Category.objects.get(id=item["category_id"])
        menu_objects.append(
            Menu(
                name=item["name"],
                description=item["description"],
                image=item["image_url"],
                category=category
            )
        )
    except Category.DoesNotExist:
        print(f"Category ID {item['category_id']} not found. Skipping item '{item['name']}'.")
    except KeyError as e:
        print(f"Missing field {e} in item: {item}")

# Bulk insert into the database
if menu_objects:
    Menu.objects.bulk_create(menu_objects)
    print(f"Successfully added {len(menu_objects)} menu items.")
else:
    print("No menu items were added.")

exit()