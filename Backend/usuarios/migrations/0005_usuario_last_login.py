# Generated by Django 4.2.1 on 2023-06-04 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0004_alter_usuario_managers_remove_usuario_date_joined_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
    ]
