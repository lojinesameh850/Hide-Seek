import numpy as np

def play_round(payoff_matrix, human_choice, human_role):
    n = payoff_matrix.shape[0]

    if human_role == 'hider':
        # Human fixed row h
        h = human_choice
        seeker_payoffs = -payoff_matrix[h, :]
        best_s = np.argmax(seeker_payoffs)
        computer_choice = best_s
        hider_payoff = payoff_matrix[h, computer_choice]
        seeker_payoff = -hider_payoff
        computer_strategy = np.zeros(n)
        computer_strategy[computer_choice] = 1.0

    elif human_role == 'seeker':
        s = human_choice
        hider_payoffs = payoff_matrix[:, s]
        best_h = np.argmax(hider_payoffs)
        computer_choice = best_h
        hider_payoff = payoff_matrix[computer_choice, s]
        seeker_payoff = -hider_payoff
        computer_strategy = np.zeros(n)
        computer_strategy[computer_choice] = 1.0

    else:
        raise ValueError("Invalid human_role: must be 'hider' or 'seeker'")

    if hider_payoff > 0:
        winner = 'hider'
    elif hider_payoff < 0:
        winner = 'seeker'
    else:
        winner = 'draw'

    return {
        'human_role': human_role,
        'human_choice': human_choice,
        'computer_role': 'seeker' if human_role == 'hider' else 'hider',
        'computer_choice': int(computer_choice),
        'hider_payoff': float(hider_payoff),
        'seeker_payoff': float(seeker_payoff),
        'winner': winner,
        'computer_strategy': computer_strategy
    }
