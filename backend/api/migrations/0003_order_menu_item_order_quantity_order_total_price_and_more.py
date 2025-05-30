# Generated by Django 5.1.1 on 2025-01-12 13:25

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_orderitem_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='menu_item',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='api.menuitem'),
        ),
        migrations.AddField(
            model_name='order',
            name='quantity',
            field=models.PositiveIntegerField(null=True, validators=[django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AddField(
            model_name='order',
            name='total_price',
            field=models.DecimalField(decimal_places=2, max_digits=6, null=True),
        ),
        migrations.DeleteModel(
            name='OrderItem',
        ),
    ]
