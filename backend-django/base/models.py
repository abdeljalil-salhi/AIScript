from django.db import models

class Book(models.Model):
    author = models.CharField(max_length=40)
    title = models.CharField(max_length=50)
    topic = models.CharField(max_length=200)
    target_audience = models.CharField(max_length=50)
    num_chapters = models.IntegerField()
    num_subsections = models.IntegerField()
    cover = models.CharField(max_length=200)
    table_of_contents = models.JSONField()
    content = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
