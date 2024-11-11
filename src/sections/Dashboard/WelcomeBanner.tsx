import React from 'react';
import styled from 'styled-components';

const Buttons = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (min-width: 800px) {
    height: 100%;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-top: 0!important;
  }

  & > button {
    border: none;
    width: 100%;
    border-radius: 10px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.3);
    transition: background 0.3s ease, transform 0.3s ease;
    color: #000;
    font-size: 1.1rem;
    font-family: 'Luckiest Guy', cursive;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 0, 0, 0.8);
    &:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.05);
    }
  }
`;

const Welcome = styled.div`
  @keyframes welcome-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes backgroundGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  background: linear-gradient(-45deg, #ffb07c, #ff3e88, #2969ff, #ef3cff, #ff3c87);
  background-size: 300% 300%;
  animation: welcome-fade-in 0.5s ease, backgroundGradient 20s ease infinite;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  filter: drop-shadow(0 8px 6px rgba(0,0,0,0.1)) drop-shadow(0 4px 4px rgba(0,0,0,0.1));

  & > div {
    text-align: center;
    color: #FFF;
    font-family: 'Neon Lights', cursive;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 0, 255, 0.5);
  }

  & h1 {
    font-size: 2.5rem;
    margin: 0;
    color: #FFF;
  }

  & p {
    font-size: 1.2rem;
  }

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 0;
    & > div {
      padding: 40px;
    }
  }
`;

export function WelcomeBanner() {
  return (
    <Welcome>
      <div>
        <h1>Welcome to Acres.bet 💎</h1>
        <p>A fair, simple and decentralized casino on Solana.</p>
      </div>
      <Buttons>
        <button onClick={() => window.open('https://v2.gamba.so/', '_blank')}>
          🚀 Add Liquidity
        </button>
        <button onClick={() => window.open('https://discord.gg/HSTtFFwR', '_blank')}>
          💬 Discord
        </button>
      </Buttons>
    </Welcome>
  );
}
