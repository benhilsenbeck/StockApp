# Generated by Django 3.2.5 on 2021-07-25 03:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_stocks_numberofstocks'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stocks',
            name='sellingPrice',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=20, null=True),
        ),
    ]
