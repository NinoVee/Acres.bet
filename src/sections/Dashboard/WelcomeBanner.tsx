import React from 'react';
import styled from 'styled-components';

// Main container for the casino-style background and layout
const CasinoContainer = styled.div`
  background: url('https://example.com/vegas-background.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ffffff;
  font-family: 'Times New Roman', Times, serif; /* Updated font */
  text-align: center;
`;

// Welcome box with transparent background and neon effects
const WelcomeBox = styled.div`
  background: rgba(0, 0, 0, 0.7); /* Transparent background */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.3);
  backdrop-filter: blur(10px);
  max-width: 600px;
  animation: neonGlow 2s ease-in-out infinite alternate;

  @keyframes neonGlow {
    0% {
      box-shadow: 0 0 10px rgba(57, 255, 20, 0.3), 0 0 20px rgba(57, 255, 20, 0.4);
    }
    100% {
      box-shadow: 0 0 20px rgba(57, 255, 20, 0.6), 0 0 30px rgba(57, 255, 20, 0.7);
    }
  }

  & h1 {
    font-size: 3rem;
    color: #39ff14;
    text-shadow: 0 0 8px rgba(57, 255, 20, 0.8), 0 0 20px rgba(57, 255, 20, 0.6);
    font-family: 'Times New Roman', Times, serif; /* Updated font */
    margin-bottom: 15px;
  }

  & p {
    font-size: 1.2rem;
    color: #ffffff;
    margin: 10px 0;
    font-family: 'Times New Roman', Times, serif; /* Updated font */
  }
`;

// Styled buttons with neon glow and hover effects
const CasinoButton = styled.button`
  background: rgba(0, 0, 0, 0.8);
  color: #39ff14;
  font-family: 'Times New Roman', Times, serif; /* Updated font */
  border: 2px solid #39ff14;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 5px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.4);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(57, 255, 20, 0.8), 0 0 30px rgba(57, 255, 20, 0.5);
  }
`;


// Main welcome component that wraps text and buttons
export function WelcomeBanner() {
  return (
    <CasinoContainer>
      <WelcomeBox>
        <h1>Welcome to Acres.Bet 🎰</h1>
        <p>Your ultimate online casino experience on the Solana blockchain.</p>
        <CasinoButton onClick={() => window.open('https://v2.gamba.so/', '_blank')}>
          💚 Add Liquidity
        </CasinoButton>
        <CasinoButton onClick={() => window.open('https://discord.gg/rJaZUfryDx', '_blank')}>
          💬 Join Discord
        </CasinoButton>
        <CasinoButton onClick={() => window.open('https://jup.ag/swap/SOL-9hTF4azRpZQFqgZ3YpgACD3aSbbB4NkeEUhp7NKZvmWe', '_blank')}>
          💰 Buy $Acres
        </CasinoButton>
      </WelcomeBox>
    </CasinoContainer>
  );
}
