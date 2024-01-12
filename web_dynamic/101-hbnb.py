#!/usr/bin/python3
""" Starts a Flask Web Application """
import uuid
import requests
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()

@app.route('/101-hbnb/', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    # Add the cache_id variable with a unique UUID
    cache_id = str(uuid.uuid4())

    return render_template('101-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           cache_id=cache_id)


@app.route('/101-hbnb/api/v1/places_search', methods=['POST'], strict_slashes=False)
def places_search():
    """ Search for places based on amenities, cities, and states """
    data = request.get_json()
    if not data:
        data = {}

    amenities = data.get('amenities', [])
    cities = data.get('cities', [])
    states = data.get('states', [])

    places = storage.all(Place).values()
    places = [place.to_dict() for place in places
              if all(amenity.id in place['amenities'] for amenity in amenities)
              and all(city.id in place['cities'] for city in cities)
              and all(state.id in place['states'] for state in states)]

    return jsonify(places)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
