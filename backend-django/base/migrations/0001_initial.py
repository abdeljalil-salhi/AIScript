# Generated by Django 5.0.2 on 2024-02-12 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=40)),
                ('title', models.CharField(max_length=40)),
                ('topic', models.CharField(max_length=200)),
                ('target_audience', models.CharField(max_length=100)),
                ('num_chapters', models.IntegerField()),
                ('num_subsections', models.IntegerField()),
                ('cover', models.CharField(max_length=100)),
                ('table_of_contents', models.JSONField()),
                ('content', models.JSONField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
