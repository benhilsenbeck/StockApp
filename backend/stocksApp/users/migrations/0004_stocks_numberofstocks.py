# Generated by Django 3.2.5 on 2021-07-25 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_stocks_sellingprice'),
    ]

    operations = [
        migrations.AddField(
            model_name='stocks',
            name='numberOfStocks',
            field=models.IntegerField(default=0),
        ),
    ]
