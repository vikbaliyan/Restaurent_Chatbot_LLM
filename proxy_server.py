from flask import Flask,request,jsonify
from flask_cors import CORS
import json
app = Flask(__name__)
import requests

CORS(app)
@app.route('/chat', methods=['POST'])
def handle_message():
    try:
        data = request.get_data()
        print(data)  # This will automatically parse the JSON data from the request body
        # user_message = data.get('message', '')  # Assuming 'message' is the key for user input
        # Process user_message and generate bot_response
        bot_response = "This is a sample bot response."
        data = data.decode('utf-8')  # Convert bytes to a UTF-8 encoded string
        data = json.loads(data)

        prompt = data['message']
        print(prompt)

        import requests
        headers = {'Content-Type':'application/json'}

        URL = "http://19ec-104-198-0-26.ngrok.io/chat"
 
        PARAMS = {'message':prompt}
        
        r = requests.post(url = URL,json=PARAMS)

        data = r.json()
        

        print(data)
        response = data['response']
        # response = query_engine.query(prompt)

        # print(user_message)
        return jsonify({'response': response})

    except Exception as e:
      print(e)
      return jsonify({'error': 'Invalid request'}), 400

if __name__ == "__main__":
  app.run(debug=True)
