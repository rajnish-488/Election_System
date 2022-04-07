from django.urls import path
from .routes import admin, voters,position,candidate,vote,winner,signin

from . import views




urlpatterns = [
    path('home/', views.index, name='index'),

    path("admin/", admin.admin, name="admin"),
    path("admin/<int:id>/", admin.AdminID, name='AdminID'),

    path("voters/", voters.voters, name="voters"),
    path("voters/<int:id>/", voters.VotersID, name='votersID'),

    path("position/", position.position, name="Position"),
    path("position/<int:id>/", position.PositionID, name='PositionID'),

    path("candidate/", candidate.candidate, name="candidate"),
    path("candidate/<int:id>/", candidate.CandidateID, name='candidateID'),

    path("vote/", vote.vote, name="vote"),
    path("vote/<int:id>/", vote.VoteID, name='voteID'),

    path("winner/", winner.winner, name="winner"),
    path("winner/<int:id>/", winner.WinnerID, name='winnerID'),

    path("signin/<str:username>/",signin.signin , name="signin"),
]