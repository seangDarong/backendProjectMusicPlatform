import React, { useState } from 'react';

export default function PlanSelection({ profile, token, onPlanChange, onBack }) {
  const [isChanging, setIsChanging] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(profile?.planType || 'free');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0/month',
      features: [
        'Limited song skips',
        'Ads between songs',
        'Standard audio quality',
        'Create playlists',
        'Basic recommendations'
      ],
      color: '#9c88d4',
      buttonColor: '#7f8c8d'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99/month',
      features: [
        'Unlimited song skips',
        'No ads',
        'High-quality audio',
        'Offline downloads',
        'Advanced recommendations',
        'Exclusive content'
      ],
      color: '#f39c12',
      buttonColor: '#e67e22'
    }
  ];

  const handlePlanSelect = async (planType) => {
    if (planType === profile?.planType) {
      // Already on this plan
      return;
    }

    setIsChanging(true);
    try {
      console.log('Making API call to change plan to:', planType);
      
      const response = await fetch(`http://localhost:3000/api/subscribers/change-plan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ planType })
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Success response:', data);
        alert(`Successfully changed to ${planType} plan!`);
        onPlanChange(data.subscriber); // Update parent component
        onBack(); // Go back to profile
      } else {
        const error = await response.json();
        console.error('Error response:', error);
        alert('Failed to change plan: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Error changing plan: ' + error.message);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        backgroundColor: '#181818',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: '2px solid #444',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}
        >
          ← Back to Profile
        </button>
        
        <h2
          style={{
            color: 'white',
            marginBottom: '0.5rem',
            fontSize: '2.5rem',
            fontWeight: 'bold'
          }}
        >
          Choose Your Plan
        </h2>
        
        <p style={{ color: '#b3b3b3', fontSize: '1.1rem' }}>
          Current plan: <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>
            {profile?.planType === 'premium' ? 'Premium' : 'Free'}
          </span>
        </p>
      </div>

      {/* Plans Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        {plans.map((plan) => {
          const isCurrentPlan = plan.id === profile?.planType;
          const isSelected = plan.id === selectedPlan;

          return (
            <div
              key={plan.id}
              style={{
                background: isCurrentPlan ? '#6b21a8' : '#f5f1fb',
                borderRadius: '12px',
                padding: '2rem',
                border: isSelected ? '3px solid #6b21a8' : '2px solid #9c88d4',
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '20px',
                    background: '#6b21a8',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}
                >
                  CURRENT PLAN
                </div>
              )}

              {/* Plan Header */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3
                  style={{
                    color: 'white',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}
                >
                  {plan.name}
                </h3>
                <div
                  style={{
                    color: plan.id === 'premium' ? '#f39c12' : '#b3b3b3',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {plan.price}
                </div>
              </div>

              {/* Features List */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 2rem 0'
                }}
              >
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      color: '#b3b3b3',
                      marginBottom: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.95rem'
                    }}
                  >
                    <span style={{ color: '#6b21a8', marginRight: '0.5rem' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan.id);
                }}
                disabled={isCurrentPlan || isChanging}
                style={{
                  width: '100%',
                  background: isCurrentPlan 
                    ? '#8b5cf6' 
                    : plan.id === 'premium' 
                      ? '#6b21a8' 
                      : '#9c88d4',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: isCurrentPlan ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {isChanging 
                  ? 'Changing Plan...' 
                  : isCurrentPlan 
                    ? 'Current Plan' 
                    : `Select ${plan.name}`
                }
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div
        style={{
          marginTop: '3rem',
          textAlign: 'center',
          color: '#b3b3b3',
          fontSize: '0.9rem'
        }}
      >
        <p>✨ Plans can be changed at any time</p>
        <p>💳 No payment processor integration yet - instant plan changes for testing</p>
      </div>
    </div>
  );
}
