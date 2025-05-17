from aiohttp import Payload
from flask import Flask, request, jsonify
import numpy as np
from functions import *
app = Flask(__name__)

# Paste the previously given LP solving functions and play_round here
# (Assuming they are defined as solve_lp_for_hider, solve_lp_for_seeker, play_round)

@app.route('/play', methods=['POST'])
def get_strategy():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Extract the required inputs
    try:
        payoff_matrix = np.array(data.get('payoff'))
        human_role = data.get('human_role')  # "hider" or "seeker"
        human_choice = data.get('human_choice')  # 1-based index
        
        # Convert human_choice to 0-based index
        human_choice = int(human_choice) - 1
        
        # Validate inputs
        if human_role not in ["hider", "seeker"]:
            return jsonify({"error": "Invalid role. Must be 'hider' or 'seeker'"}), 400
        
        if not (0 <= human_choice < len(payoff_matrix)):
            return jsonify({"error": "Invalid choice index"}), 400
        
        # Determine computer's role (opposite of human's role)
        computer_role = "seeker" if human_role == "hider" else "hider"
        
        # Compute optimal mixed strategy for the computer based on its role
        computer_probabilities = compute_optimal_strategy(payoff_matrix, computer_role)
        # Make a choice for the computer based on the calculated probabilities
        computer_choice = make_computer_choice(computer_probabilities)
        
        # Compute optimal strategies for both roles (for informational purposes)
        hider_optimal_strategy = compute_optimal_strategy(payoff_matrix, "hider")
        seeker_optimal_strategy = compute_optimal_strategy(payoff_matrix, "seeker")
        
        # Determine game outcome and payoff
        if human_role == "hider":
            payoff = payoff_matrix[human_choice, computer_choice]
        else:  # human is seeker
            payoff = payoff_matrix[computer_choice, human_choice]
        if payoff > 0 :
            winner = "hider" 
        elif payoff <0 : 
            winner = "seeker"
        else:
            winner = "draw"
        hider_payoff = payoff
        seeker_payoff = -payoff if payoff != 0.0 else 0.0
        # Prepare the response
        response = {
            "computer_choice": int(computer_choice + 1),  # Convert back to 1-based index and to standard Python int
            "computer_role" : computer_role,
            "human_role" : human_role,
            "hider_payoff": float(hider_payoff),
            "seeker_payoff" : float(seeker_payoff),
            "winner" : winner,
            "hider_optimal_strategy": [float(x) for x in hider_optimal_strategy],
            "seeker_optimal_strategy": [float(x) for x in seeker_optimal_strategy],
            "game_value": float(hider_optimal_strategy @ payoff_matrix @ seeker_optimal_strategy)
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)