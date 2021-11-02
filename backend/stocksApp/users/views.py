from django.http.response import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from users.models import stocks
from users.serializers import  MyTokenObtainPairSerializer, userAccountsSerializer, addStockSerializer, getStocksSerializer
from rest_framework import  permissions 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
import requests

class ObtainTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class userCreateAccountView(APIView):
  permission_classes = (permissions.AllowAny,)
  def post(self, request):
    serializer = userAccountsSerializer(data=request.data)
    if serializer.is_valid():
      if('password' in self.request.data):
        password = make_password(self.request.data['password'])
        serializer.save(password=password)
        return Response(serializer.data)
      else:
        return Response("This did not save serializer")
    else:
        return Response("The serializer was not valid")

class addStocksView(APIView):
    def post(self, request):
        stocksSerializer = addStockSerializer(data=request.data)
        if stocksSerializer.is_valid():
            stocksSerializer.save(user_id = self.request.user.userId)
            return JsonResponse("Added Successfully", safe=False)
        print(stocksSerializer.errors)
        return JsonResponse("Failed to add", safe=False)
    def get(self, request):
        stockList = []
        stocks2 = stocks.objects.filter(user_id = self.request.user.userId)
        response2 = stocks2.values()
        for i in range(len(response2)):
            stockName = response2[i]['stockName']
            numberOfStocks = response2[i]['numberOfStocks']
            stockPrice = response2[i]['purchasePrice']
            stockList.append([stockName, stockPrice, numberOfStocks])
        return Response(stockList)

class searchStocksView(APIView):
  def post(self, request):
    dic1 = {}
    print(request.data['stockName'])
    stockName = request.data['stockName']
    req = requests.get("https://finnhub.io/api/v1/search?q=" + stockName + "&token=sandbox_c3q703iad3i8q4a5a1qg")
    result = req.json()
    dic1['description'] = result['result'][0]['description']
    dic1['symbol'] = result['result'][0]['symbol']
    stockSymbol = result['result'][0]['symbol']
    req2 = requests.get("https://finnhub.io/api/v1/quote?symbol=" + stockSymbol + "&token=c3q703iad3i8q4a5a1q0")
    result2 = req2.json()
    dic1['current'] = result2['c']
    dic1['open'] = result2['o']
    print(dic1)
    return Response(dic1)

