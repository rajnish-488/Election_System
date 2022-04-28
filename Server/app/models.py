# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from distutils.command.upload import upload
from django.db import models


class Admin(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100)
    name = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'admin'

def upload_path(instance, filname):
    return '/'.join(['covers', str(instance.id), str(instance.id)])

class Voters(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    stream = models.CharField(max_length=100)
    regno = models.IntegerField(db_column='regNo', unique=True)  # Field name made lowercase.
    year = models.IntegerField()
    username = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = True
        db_table = 'voters'


class Position(models.Model):
    id = models.AutoField(primary_key=True)
    position = models.CharField(max_length=100)
    minyear = models.IntegerField(db_column='minYear')  # Field name made lowercase.
    winneris = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'position'




class Candidate(models.Model):
    id = models.AutoField(primary_key=True)
    issue = models.CharField(max_length=1000)
    createdat = models.DateTimeField(auto_now_add=True)  # Field name made lowercase.
    skill = models.CharField(max_length=1000)
    slogan = models.CharField(max_length=500)
    votes = models.IntegerField(blank=True, null=True)

    voters = models.ForeignKey(Voters, on_delete=models.CASCADE, related_name='candidate')  # Field name made lowercase.
    position = models.ForeignKey(Position, on_delete=models.CASCADE, related_name='candidate')
    

    class Meta:
        managed = True
        db_table = 'candidate'




class Vote(models.Model):
    id = models.AutoField(primary_key=True)
    createdat = models.DateTimeField(auto_now_add=True)  # Field name made lowercase.

    voters = models.ForeignKey(Voters, on_delete=models.CASCADE, related_name='vote')  # Field name made lowercase.
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='vote')  # Field name made lowercase.
    position = models.ForeignKey(Position, on_delete=models.CASCADE, related_name='vote')

    class Meta:
        managed = True
        db_table = 'vote'




class Winner(models.Model):
    id = models.AutoField(primary_key=True)
    ratio= models.IntegerField(blank=True, null=True)

    position = models.ForeignKey(Position, on_delete=models.CASCADE, related_name='winner')
    candidate = models.ForeignKey(Candidate,on_delete=models.CASCADE, related_name='winner')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'winner'

class Images(models.Model):
    id= models.AutoField(primary_key=True)
    userid = models.IntegerField(unique=True)
    img= models.TextField(null=True, blank= True, max_length=100000)

    class Meta:
        managed= True
        db_table= 'image'