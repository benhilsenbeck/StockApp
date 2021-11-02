from rest_framework import serializers
from users.models import users, stocks
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib import auth
from django.contrib.auth.hashers import make_password


class userAccountsSerializer(serializers.ModelSerializer):
  class Meta:
    model = users
    fields = ('userId', "last_login", 'fName', 'lName', 'username', 'email', 'password', 'joinedDate', 'is_staff', 'is_superuser')

    def create(self, validated_data):
        user = users.objects.create(
            email = validated_data['email'],
            username = validated_data['username'],
            password = make_password(validated_data['password'])
        )
        user.save()
        return user



class usersSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('userId', 'fName', 'lName', 'username', 'email', 'password', 'joinedDate')

class addStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = stocks
        fields = ('user_id', 'stockName', 'ticker', 'numberOfStocks', 'purchasePrice', 'sellingPrice')

    def create2(self, validated_data):
        stockInfo = users.objects.create(
            stockName = validated_data['stockName'],
            ticker = validated_data['ticker'],
            numberOfStocks = validated_data['numberOfStocks'],
            purchasePrice = validated_data['purchasePrice'],
            sellingPrice = validated_data['sellingPrice']
        )
        stockInfo.save()
        return stockInfo


class getStocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = stocks
        fields = ('user_id', 'stockName', 'ticker', 'numberOfStocks', 'purchasePrice', 'sellingPrice')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        return token