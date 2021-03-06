from django.urls import path
from .routes import admin, voters,position,candidate,vote,winner,signin,Candiadtelimit,auth,posCandUser,result,posvoted,images,imageCheck

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

    path("images/", images.images, name="images"),
    path("images/<int:id>/", images.imagesID, name='imagesID'),

    path("signin/<str:username>/",signin.signin , name="signin"),
    path("signinVoter/<str:username>/",signin.signinVoter , name="signinVoter"),

    path("candlimit/",Candiadtelimit.candidateLimit , name="climit"),
    path("auth/",auth.Auth, name="auth"),
    
    path("poscanduser/<int:id>/",posCandUser.solve,name='poscanduser'),
    path("result/<int:id>/", result.result, name="reslut"),
    path("posvoted/<str:username>/",posvoted.solve, name="posvoted"),

    path("imgcheck/<int:id>/", imageCheck.imagesID , name="check")



    
]