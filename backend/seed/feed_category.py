from api.models import Category

# List of category names to add
categories = ["Appetizers", "Main Course", "Desserts", "Beverages"]

# Create and save each category
category_objects = [Category(name=name) for name in categories]
Category.objects.bulk_create(category_objects)

print(f"Successfully added {len(category_objects)} categories.")
