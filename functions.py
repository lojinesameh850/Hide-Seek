from flask import Flask, request, jsonify
import numpy as np
import scipy.optimize as opt
import random

app = Flask(__name__)

def compute_optimal_strategy(payoff_matrix, player_type):
    """
    Compute the optimal mixed strategy for a player in a zero-sum game.
    
    Args:
        payoff_matrix (numpy.ndarray): The payoff matrix from the hider's perspective
        player_type (str): Either "hider" or "seeker"
    
    Returns:
        numpy.ndarray: Probability distribution for the optimal mixed strategy
    """
    n = len(payoff_matrix)
    
    if player_type == "hider":
        # For the hider, we want to maximize the minimum expected payoff
        # This is a linear programming problem
        
        # Objective function: maximize v
        c = np.zeros(n + 1)
        c[0] = -1.0  # We want to maximize v, so we minimize -v
        
        # Constraints:
        # For each of seeker's strategies j, we have: sum_i (p_i * payoff_matrix[i,j]) >= v
        # Where p_i is the probability of hider choosing strategy i, and v is the minimum expected payoff
        
        A = np.zeros((n, n + 1))
        A[:, 0] = -1.0  # Coefficient for v in each constraint
        for j in range(n):
            A[j, 1:] = -payoff_matrix[:, j]  # Coefficients for p_1 through p_n
        
        b = np.zeros(n)  # Right-hand side of the constraints
        
        # Additional constraints: probabilities sum to 1 and are non-negative
        A_eq = np.zeros((1, n + 1))
        A_eq[0, 1:] = 1.0
        b_eq = np.array([1.0])
        
        # Bounds: v is unbounded, probabilities are between 0 and 1
        bounds = [(None, None)] + [(0, 1)] * n
        
        # Solve the linear program
        result = opt.linprog(c, A_ub=A, b_ub=b, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')
        
        if result.success:
            # Extract the optimal probabilities (excluding v)
            return result.x[1:]
        else:
            # If optimization fails, use uniform distribution as fallback
            return np.ones(n) / n
            
    elif player_type == "seeker":
        # For the seeker, we want to minimize the maximum expected payoff for the hider
        # This is also a linear programming problem, but we can use the fact that 
        # for a zero-sum game, the seeker's optimal strategy is the solution to:
        
        # Objective function: minimize v
        c = np.zeros(n + 1)
        c[0] = 1.0  # We want to minimize v
        
        # Constraints:
        # For each of hider's strategies i, we have: sum_j (q_j * payoff_matrix[i,j]) <= v
        # Where q_j is the probability of seeker choosing strategy j
        
        A = np.zeros((n, n + 1))
        A[:, 0] = -1.0  # Coefficient for v in each constraint
        for i in range(n):
            A[i, 1:] = payoff_matrix[i, :]  # Coefficients for q_1 through q_n
        
        b = np.zeros(n)  # Right-hand side of the constraints
        
        # Additional constraints: probabilities sum to 1 and are non-negative
        A_eq = np.zeros((1, n + 1))
        A_eq[0, 1:] = 1.0
        b_eq = np.array([1.0])
        
        # Bounds: v is unbounded, probabilities are between 0 and 1
        bounds = [(None, None)] + [(0, 1)] * n
        
        # Solve the linear program
        result = opt.linprog(c, A_ub=A, b_ub=b, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')
        
        if result.success:
            # Extract the optimal probabilities (excluding v)
            return result.x[1:]
        else:
            # If optimization fails, use uniform distribution as fallback
            return np.ones(n) / n
    
    # Default fallback to uniform distribution
    return np.ones(n) / n

def make_computer_choice(probabilities):
    """
    Make a choice for the computer based on the given probability distribution.
    
    Args:
        probabilities (numpy.ndarray): Probability distribution
    
    Returns:
        int: The chosen strategy index (0-based)
    """
    choices = list(range(len(probabilities)))
    return np.random.choice(choices, p=probabilities)
