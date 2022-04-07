from turtle import position
from rest_framework import serializers
from .models import Admin,Vote,Voters,Candidate,Winner,Position




class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id','username','password','email','name']


class VotersSerializer(serializers.ModelSerializer):

    candidate=serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    vote=serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Voters
        fields = ['id','username','password','email','name','stream','regno','year','candidate','vote']



class PositionSerializer(serializers.ModelSerializer):
    candidate=serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    vote=serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    winner=serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Position
        fields = ['id','position','minyear','winneris','candidate','vote','winner']



class CandidateSerializer(serializers.ModelSerializer):
    voters=serializers.PrimaryKeyRelatedField(
        many=False, queryset=Voters.objects.all())

    position=serializers.PrimaryKeyRelatedField(
        many=False, queryset=Position.objects.all())

    vote=serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    winner=serializers.PrimaryKeyRelatedField(many=True, read_only=True)



    class Meta:
        model = Candidate
        fields = ['id','issue','skill','slogan','votes','createdat','voters','position','vote','winner']




class VoteSerializer(serializers.ModelSerializer):

    voters=serializers.PrimaryKeyRelatedField(
        many=False, queryset=Voters.objects.all())

    position=serializers.PrimaryKeyRelatedField(
        many=False, queryset=Position.objects.all())

    candidate=serializers.PrimaryKeyRelatedField(
        many=False, queryset=Candidate.objects.all())

    
    class Meta:
        model = Vote
        fields = ['id','createdat','voters','candidate','position']






class WinnerSerializer(serializers.ModelSerializer):
    position=serializers.PrimaryKeyRelatedField(
        many=False, queryset=Position.objects.all())

    candidate=serializers.PrimaryKeyRelatedField(
        many=False, queryset=Candidate.objects.all())


    class Meta:
        model = Winner
        fields = ['id','ratio','position','candidate']

