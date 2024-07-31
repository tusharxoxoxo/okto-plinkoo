import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";
import { Button } from "../components/ui";
import { baseURL } from "../utils";

export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>();
  const [betAmount, setBetAmount] = useState('');
  const [risk, setRisk] = useState('medium');

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current as unknown as HTMLCanvasElement,
      );
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  const handleBet = async () => {
    const response = await axios.post(`${baseURL}/game`, {
      betAmount,
      risk,
    });
    if (ballManager) {
      ballManager.addBall(response.data.point);
    }
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <canvas ref={canvasRef} width="800" height="800" className="game-canvas"></canvas>
        <div className="controls">
          <div className="control-item">
            <label htmlFor="betAmount" className="control-label">Bet Amount</label>
            <input 
              id="betAmount" 
              type="text" 
              className="control-input" 
              placeholder="0.00000000" 
              value={betAmount} 
              onChange={(e) => setBetAmount(e.target.value)} 
            />
          </div>
          <div className="control-item">
            <label htmlFor="risk" className="control-label">Risk</label>
            <select 
              id="risk" 
              className="control-input" 
              value={risk} 
              onChange={(e) => setRisk(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <Button
            className="control-button"
            onClick={handleBet}
          >
            Bet
          </Button>
        </div>
      </div>
    </div>
  );
}
