import jwt
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.shortcuts import render
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import authenticate

from .models import User
from .serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class UserView(APIView):
    user_serializer = UserSerializer

    def post(self, request):

        data = request.data
        data['password'] = make_password(data['password'])
        serializer = self.user_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request):
        user = User.objects.all()
        serializer_class = self.serializer_class(user, many=True)
        return Response({"users": serializer_class.data}, status=status.HTTP_200_OK)

    def delete(self, request):
        data = request.data
        user_id = request.query_params['id']

        try:
            user = User.objects.get(id=user_id)
            if user is not None:
                serializer = self.serializer_class(user, data=data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                return Response("Deleted", status=status.HTTP_200_OK)


        except:
            return Response("Invalid Id",status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    serializer_class = AuthTokenSerializer
    serializer_class_user = UserSerializer

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        serializer = self.serializer_class(data=request.data, context={'request': request})
        print("request.data", request.data)
        user = authenticate(username=username, password=password)
        if user is not None:
            # custom_payload = {
            #     'foo': 'bar',
            #     'baz': 123
            # }
            # access_token = AccessToken.for_user(user)
            # access_token['custom'] = custom_payload
            # token_string = str(access_token)
            refresh = RefreshToken.for_user(user)

            return Response({'username': user.username,
                             'email': user.email,
                             'refresh': str(refresh),
                             'access': str(refresh.access_token),
                             # 'access': str(token_string),
                             })
        else:
            return Response({'error': 'Invalid credentials'})
