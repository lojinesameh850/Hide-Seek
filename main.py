from flask import Flask, request, jsonify
import numpy as np
from functions import play_round
app = Flask(__name__)

# Paste the previously given LP solving functions and play_round here
# (Assuming they are defined as solve_lp_for_hider, solve_lp_for_seeker, play_round)

@app.route('/play', methods=['POST'])
def play():
    data = request.get_json()
    payoff = data.get('payoff')
    human_choice = data.get('human_choice')
    human_role = data.get('human_role')

    if payoff is None or human_choice is None or human_role is None:
        return jsonify({'error': 'Missing required parameters'}), 400

    payoff_matrix = np.array(payoff)

    try:
        result = play_round(payoff_matrix, human_choice, human_role)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Convert numpy arrays to lists for JSON serialization
    result['computer_strategy'] = result['computer_strategy'].tolist()

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
