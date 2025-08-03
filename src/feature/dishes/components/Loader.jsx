import React from "react";
import { FaUtensilSpoon, FaUtensils } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

const DishLoader = () => {
  return (
    <div className="loader-container">
      <div className="plate-spinner">
        <div className="plate"></div>
        <div className="icons">
          <FaUtensilSpoon className="icon spoon" />
          <GiForkKnifeSpoon className="icon fork" />
          <FaUtensils className="icon utensils" />
        </div>
      </div>
      <p className="loading-text">Cooking up delicious recipes...</p>

      {/* Embedded CSS */}
      <style jsx="true">{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .plate-spinner {
          position: relative;
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
        }

        .plate {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #f9fafb, #e5e7eb);
          border: 5px solid #cbd5e1;
          animation: spin 2s linear infinite;
        }

        .icons {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 6px;
        }

        .icon {
          font-size: 20px;
          color: #f97316;
          animation: bounce 1.2s infinite ease-in-out;
        }

        .spoon {
          animation-delay: 0s;
        }

        .fork {
          animation-delay: 0.2s;
        }

        .utensils {
          animation-delay: 0.4s;
        }

        .loading-text {
          font-size: 1rem;
          color: #4b5563;
          font-weight: 500;
          animation: pulseText 1.5s ease-in-out infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulseText {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default DishLoader;
