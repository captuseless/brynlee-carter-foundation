import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, Trophy, Heart, CheckCircle, DollarSign, Mail, Phone, User } from 'lucide-react';

// Brynlee Carter Foundation Logo (base64 embedded)
const LOGO_DATA = "data:image/jpeg;base64,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+pff1ILQDx/9Nf/aAAwDAQACAAMAAAAQ888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888VJBdX9QlUw8888888888FM1JM8888888888niJAAAAAAAAzfA888888lVMAAAT888888888BkAAAAAAAAAAAAOf88888rAAAAA8888888888BWDyBbROfEHOMAA+0888ugAAAAA888888888888888888888811KIa887DAAAAAAp888888888888888888hpC8vvbGw8EIIAAAAAl8888888888888888f1trTOa9m9s3wfeqAABa888888888888888MNDAABPc82v2aoML8AJ/r888888888888888j+AAAAAAt4PDAAnZTmB9F888888888888888JQnnhzNacrTRVAAAWKzJs8888888888888888FDvtE+yIRyDCRLnMNLAI8888888888888888ObAAAAAA//ACAww4hDjM4YtvNsfPPPPPPPPPPPLDgyAeQbutyQxynYwAG7gAeHJyPPPPPPPPPPPPOCTR3MgAHvvo4RggAEIyBqlQDfPPPPPPPPPPNvEcLhAQAAFXy3xigAANpVgKQEVPPPPPPPPLoPgABOiSgAAOiQANAgwAALYc/QADvPPPPPLVgUjmsE2NC7f4pxgAACUQAAAKfEQAAh/PPPPUAAAAO9KPo0uMck7AAAAEsQAALvFAAAKPPPPPQAAAFPgAAACRaQG9iAAAM+gABNPOwAAGvPPPFgAAAEHvQAAECQwANywAAABU1PHPKgAAIvPPPCiQTXgvP36gAKdwAEGMAAABvPPPPFAAAHPPPPPBF/PPPPPBuuv/wAAEbQQRt/PPPPHiAANfPPPPPPPPPPPPPPPPO0SgqvAWvPPPPPPPKgAIfPPPPPPPPPPPPPPHXHd/fPPPPPPPPPPPPNQHWvPPPPPPPPPPPPPOAAAAMfPPPPPPPPPPPEgxVfPPPPPPPPPPPPPPGIQAAGPPPPPPPPPPPPBEJfPPPPPPPPPPPPPPPNQAAAE/PP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";

const TurtleLogo = ({ className = "w-16 h-16" }) => (
  <img src={LOGO_DATA} alt="Brynlee Carter Foundation" className={className} />
);

export default function CharityGolfTournament() {
  const [registrationStep, setRegistrationStep] = useState('closed');
  const [formData, setFormData] = useState({
    teamName: '',
    captainName: '',
    captainEmail: '',
    captainPhone: '',
    player2Name: '',
    player3Name: '',
    player4Name: '',
    sponsorshipLevel: 'foursome',
    specialRequests: '',
    paymentMethod: 'online'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const squareCardRef = useRef(null);
  const squarePaymentsRef = useRef(null);
  const cardMountedRef = useRef(false);

    // Square credentials from environment variables
  const SQUARE_APP_ID = process.env.REACT_APP_SQUARE_APPLICATION_ID;
  const SQUARE_LOCATION_ID = process.env.REACT_APP_SQUARE_LOCATION_ID;

  useEffect(() => {
    const initSquare = async () => {
      console.log('initSquare called');
      console.log('window.Square:', window.Square);
      console.log('APP_ID:', SQUARE_APP_ID);
      console.log('LOCATION_ID:', SQUARE_LOCATION_ID);
      console.log('card-container exists:', !!document.getElementById('card-container'));

      if (cardMountedRef.current) {
        console.log('already mounted, returning');
        return;
      }
      if (!window.Square) {
        console.log('window.Square not found');
        setPaymentError('Square payments failed to load. Please refresh the page.');
        return;
      }
      try {
        const payments = window.Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
        console.log('payments object:', payments);
        const card = await payments.card();
        console.log('card object:', card);
        await card.attach('#card-container');
        console.log('card attached successfully');
        squareCardRef.current = card;
        cardMountedRef.current = true;
        setPaymentError('');
      } catch (err) {
        console.error('Square init error:', err);
        setPaymentError('Could not load payment form. Please refresh and try again.');
      }
    };

    initSquare();
  }, []);

  const sponsorshipLevels = {
    foursome: { name: 'Foursome (Team of 4)', price: 540, description: 'Team of 4 players - includes 2 mulligans per team', allowPayOnSite: true },
    hole: { name: 'Hole Sponsor', price: 100, description: 'Name on sign at a tee box' },
    cart: { name: 'Cart Sponsor', price: 500, description: 'Name/Logo on all carts' },
    drink: { name: 'Drink Sponsor', price: 750, description: 'Name/Logo on all beverage stations' },
    silver: { name: 'Silver Sponsor', price: 1000, description: 'Includes 4-some, Hole Sponsor' },
    gold: { name: 'Gold Sponsor', price: 1500, description: 'Includes 4-some, Hole Sponsor, and Name on Towel' },
    platinum: { name: 'Platinum Sponsor', price: 2500, description: 'Includes 4-some, Hole Sponsor, and Logo on Towel' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare registration data
    const baseData = {
      teamName: formData.teamName,
      captainName: formData.captainName,
      captainEmail: formData.captainEmail,
      captainPhone: formData.captainPhone,
      player2Name: formData.player2Name || 'Not provided',
      player3Name: formData.player3Name || 'Not provided',
      player4Name: formData.player4Name || 'Not provided',
      sponsorshipLevel: formData.sponsorshipLevel,
      sponsorshipName: sponsorshipLevels[formData.sponsorshipLevel].name,
      amount: totalAmount(),
      specialRequests: formData.specialRequests || 'None',
      paymentMethod: formData.paymentMethod,
      timestamp: new Date().toLocaleString()
    };

    try {
      if (formData.paymentMethod === 'online') {
        // Step 1: Tokenize card via Square Web Payments SDK
        const tokenResult = await squareCardRef.current.tokenize();
        if (tokenResult.status !== 'OK') {
          setPaymentError(tokenResult.errors?.[0]?.message || 'Card tokenization failed');
          setIsSubmitting(false);
          return;
        }

        // Step 2: Charge via Square backend
        const chargeResponse = await fetch('/api/square-charge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourceId: tokenResult.token,
            amount: baseData.amount,
            note: `${baseData.teamName} - ${baseData.sponsorshipName}`
          })
        });
        const chargeResult = await chargeResponse.json();

        if (!chargeResult.success) {
          setPaymentError(chargeResult.error || 'Payment failed. Please try again.');
          setIsSubmitting(false);
          return;
        }

        // Step 3: Write to Sheets only after confirmed charge
        await fetch('https://sheetdb.io/api/v1/ts1jfrfo6a9ig', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              'Team Name': baseData.teamName,
              'Captain Name': baseData.captainName,
              'Email': baseData.captainEmail,
              'Phone': baseData.captainPhone,
              'Player 2': baseData.player2Name,
              'Player 3': baseData.player3Name,
              'Player 4': baseData.player4Name,
              'Sponsorship Level': baseData.sponsorshipLevel,
              'Sponsorship Name': baseData.sponsorshipName,
              'Amount': baseData.amount,
              'Payment Method': baseData.paymentMethod,
              'Payment Status': 'Paid',
              'Square Payment ID': chargeResult.paymentId || '',
              'Special Requests': baseData.specialRequests,
              'Timestamp': baseData.timestamp
            }
          })
        });

        setIsSubmitting(false);
        setSubmitSuccess(true);
        setRegistrationStep('success');

      } else {
        // Pay on-site: write to Sheets directly
        await fetch('https://sheetdb.io/api/v1/ts1jfrfo6a9ig', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              'Team Name': baseData.teamName,
              'Captain Name': baseData.captainName,
              'Email': baseData.captainEmail,
              'Phone': baseData.captainPhone,
              'Player 2': baseData.player2Name,
              'Player 3': baseData.player3Name,
              'Player 4': baseData.player4Name,
              'Sponsorship Level': baseData.sponsorshipLevel,
              'Sponsorship Name': baseData.sponsorshipName,
              'Amount': baseData.amount,
              'Payment Method': baseData.paymentMethod,
              'Payment Status': 'Pay On-Site',
              'Square Payment ID': '',
              'Special Requests': baseData.specialRequests,
              'Timestamp': baseData.timestamp
            }
          })
        });

        setIsSubmitting(false);
        setSubmitSuccess(true);
        setRegistrationStep('success');
      }

    } catch (error) {
      console.error('Registration error:', error);
      alert('There was an error submitting your registration. Please contact us at 636-368-2059');
      setIsSubmitting(false);
    }
  };

  const totalAmount = () => {
    const level = sponsorshipLevels[formData.sponsorshipLevel];
    return level.price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-fuchsia-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-700 to-teal-500 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <TurtleLogo className="w-16 h-16" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  Brynlee Carter Memorial Golf Tournament
                </h1>
                <p className="text-teal-100 mt-1 text-lg">Supporting Our Community, One Swing at a Time</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <TurtleLogo className="w-14 h-14 opacity-90" />
              <Heart className="w-12 h-12 text-fuchsia-300 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 to-teal-600 text-white py-20">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-fuchsia-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                Annual Memorial Golf Tournament
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Join Us for a Day of <span className="text-fuchsia-400">Golf & Giving</span>
              </h2>
              <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                Join us for our annual memorial golf tournament - a 4-person scramble format. Enjoy lunch, dinner, flighted prize money, and most importantly, support families with children who have complex medical conditions. #brynleestrong
              </p>
              <button
                onClick={() => {
                  setRegistrationStep('form');
                  setTimeout(() => {
                    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
                  }, 0);
                }}
                className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-2xl transform transition hover:scale-105 active:scale-95"
              >
                Register Now
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-fuchsia-400" />
                Event Details
              </h3>
              <div className="space-y-4 text-lg">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 mt-1 text-teal-300 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Saturday, September 26, 2026</div>
                    <div className="text-teal-200">11:30 AM Registration • 12:30 PM Tee Off</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-teal-300 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Wolf Hollow Golf Course</div>
                    <div className="text-teal-200">4504 MO-100, Labadie, MO 63055</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 mr-3 mt-1 text-teal-300 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Limited to 36 Teams</div>
                    <div className="text-teal-200">Register your foursome today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-teal-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Your Impact in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Last year's tournament raised $10,000 for a local family with a child who has complex medical conditions. Together, we make a real difference in our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '5', label: 'Families Supported', icon: Heart },
              { number: '$10K', label: 'Raised in 2025', icon: DollarSign },
              { number: '100%', label: 'Goes to Families', icon: Users }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-lg text-center border-2 border-teal-100 hover:border-teal-300 transition-all transform hover:-translate-y-1">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-teal-600" />
                <div className="text-5xl font-bold text-teal-900 mb-2">{stat.number}</div>
                <div className="text-lg text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {registrationStep === 'closed' && (
            <div className="text-center">
              <div className="bg-white p-12 rounded-3xl shadow-2xl border-2 border-teal-200">
                <Trophy className="w-20 h-20 mx-auto mb-6 text-teal-600" />
                <h2 className="text-4xl font-bold text-teal-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Ready to Register?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Secure your spot in this year's tournament and make a difference in our community.
                </p>
                <button
                  onClick={() => setRegistrationStep('form')}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-12 rounded-xl text-xl shadow-xl transform transition hover:scale-105 active:scale-95"
                >
                  Start Registration
                </button>
              </div>
            </div>
          )}

          {registrationStep === 'form' && (
            <div className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-teal-200">
              <h2 className="text-3xl font-bold text-teal-900 mb-8 flex items-center" style={{ fontFamily: 'Georgia, serif' }}>
                <CheckCircle className="w-8 h-8 mr-3 text-teal-600" />
                Tournament Registration
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sponsorship Level */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Registration Type
                  </label>
                  <div className="space-y-3">
                    {Object.entries(sponsorshipLevels).map(([key, level]) => (
                      <label
                        key={key}
                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.sponsorshipLevel === key
                            ? 'border-teal-600 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="sponsorshipLevel"
                            value={key}
                            checked={formData.sponsorshipLevel === key}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-teal-600"
                          />
                          <div className="ml-4">
                            <div className="font-semibold text-gray-900">{level.name}</div>
                            <div className="text-sm text-gray-600">{level.description}</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-teal-700">
                          ${level.price}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Team/Contact Name *
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="Smith Industries"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Captain/Primary Contact *
                    </label>
                    <input
                      type="text"
                      name="captainName"
                      value={formData.captainName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="John Smith"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="captainEmail"
                      value={formData.captainEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="captainPhone"
                      value={formData.captainPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                {/* Additional Player Names (Optional) */}
                {formData.sponsorshipLevel === 'foursome' && (
                  <div className="col-span-2">
                    <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
                      <h4 className="font-bold text-teal-900 mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Additional Team Members (Optional)
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        You can add your other team members now, or send us their names later.
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Player 2 Name
                          </label>
                          <input
                            type="text"
                            name="player2Name"
                            value={formData.player2Name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
                            placeholder="Optional"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Player 3 Name
                          </label>
                          <input
                            type="text"
                            name="player3Name"
                            value={formData.player3Name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
                            placeholder="Optional"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Player 4 Name
                          </label>
                          <input
                            type="text"
                            name="player4Name"
                            value={formData.player4Name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
                            placeholder="Optional"
                          />
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-3">
                        Note: Player 1 is the team captain listed above. You can leave these blank and email the names to us later at Chad Carter: 636-368-2059
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Special Requests / Dietary Restrictions
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
                    placeholder="Any special accommodations needed..."
                  />
                </div>

                {/* Payment Method */}
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:border-teal-300 transition-all border-teal-600 bg-teal-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === 'online'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-teal-600"
                      />
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900">Pay Online Now</div>
                        <div className="text-sm text-gray-600">Secure payment via Square</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:border-teal-300 transition-all border-gray-200">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="onsite"
                        checked={formData.paymentMethod === 'onsite'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-teal-600"
                      />
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900">Pay On-Site</div>
                        <div className="text-sm text-gray-600">Pay by check or cash at tournament</div>
                      </div>
                    </label>
                  </div>

                  {formData.paymentMethod === 'onsite' && (
                    <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800">
                        <strong>Please Note:</strong> Payment will be collected at registration on tournament day. Make checks payable to "Brynlee Carter Foundation".
                      </p>
                    </div>
                  )}
                </div>

                {/* Total Amount */}
                <div className="bg-gradient-to-r from-teal-50 to-fuchsia-50 p-6 rounded-xl border-2 border-teal-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                    <span className="text-3xl font-bold text-teal-700">
                      ${totalAmount().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Includes: 4-person scramble, lunch, dinner, flighted prize money, and 2 mulligans per team (foursome entry)
                  </p>
                </div>

                {/* Payment Card */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="w-6 h-6 text-teal-600 mr-2" />
                    Payment Information
                  </h4>
                  
                  {/* Square Card Container */}
                  <div id="card-container" className="mb-4"></div>
                  
                  {paymentError && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-red-800 text-sm">{paymentError}</p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-600">
                    Secure payment processing powered by Square. Your card information is encrypted and secure.
                  </p>
                </div>


                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setRegistrationStep('closed')}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-6 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                  >
                    {isSubmitting ? 'Processing...' : formData.paymentMethod === 'online'
                      ? `Proceed to Payment - $${totalAmount().toLocaleString()}`
                      : `Complete Registration - $${totalAmount().toLocaleString()} (Pay On-Site)`
                    }
                  </button>
                </div>
              </form>
            </div>
          )}

          {registrationStep === 'success' && (
            <div className="bg-white p-12 rounded-3xl shadow-2xl border-2 border-teal-200 text-center">
              <div className="bg-teal-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-16 h-16 text-teal-600" />
              </div>
              <h2 className="text-4xl font-bold text-teal-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Registration Successful!
              </h2>
              {formData.paymentMethod === 'onsite' && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-amber-900 mb-2 text-xl">Payment: On-Site</h3>
                  <p className="text-amber-800">
                    Please bring payment to tournament registration on September 26, 2026.
                    <br/>Make checks payable to: <strong>Brynlee Carter Foundation</strong>
                    <br/>Amount due: <strong>${totalAmount()}</strong>
                  </p>
                </div>
              )}
              <p className="text-xl text-gray-600 mb-6">
                Thank you for registering for the Hope Springs Golf Classic.
              </p>
              {/* Team Roster */}
                {(formData.player2Name || formData.player3Name || formData.player4Name) && (
                  <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mb-6 text-left max-w-md mx-auto">
                    <h3 className="font-bold text-teal-900 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Team Roster
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <span className="font-semibold mr-2">Player 1 (Captain):</span>
                        {formData.captainName}
                      </li>
                      {formData.player2Name && (
                        <li className="flex items-center text-gray-700">
                          <span className="font-semibold mr-2">Player 2:</span>
                          {formData.player2Name}
                        </li>
                      )}
                      {formData.player3Name && (
                        <li className="flex items-center text-gray-700">
                          <span className="font-semibold mr-2">Player 3:</span>
                          {formData.player3Name}
                        </li>
                      )}
                      {formData.player4Name && (
                        <li className="flex items-center text-gray-700">
                          <span className="font-semibold mr-2">Player 4:</span>
                          {formData.player4Name}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left max-w-md mx-auto">
                <h3 className="font-bold text-gray-800 mb-3">What's Next:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Confirmation email sent to {formData.captainEmail}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Tournament details and parking information included</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>We'll send reminders as the event approaches</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setRegistrationStep('closed');
                  setFormData({
                    teamName: '',
                    captainName: '',
                    captainEmail: '',
                    captainPhone: '',
                    player2Name: '',
                    player3Name: '',
                    player4Name: '',
                    sponsorshipLevel: 'foursome',
                    specialRequests: ''
                  });
                  setSubmitSuccess(false);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-xl transition"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sponsorship Benefits */}
      <section className="py-16 bg-gradient-to-br from-teal-800 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Georgia, serif' }}>
            Sponsorship Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Hole Sponsor', benefits: ['Name on sign at tee box', 'Recognition in program', 'Social media mention'], price: '$100' },
              { title: 'Cart Sponsor', benefits: ['Name/Logo on all carts', 'Premium visibility', 'Event signage'], price: '$500' },
              { title: 'Drink Sponsor', benefits: ['Name/Logo on beverage stations', 'High traffic visibility', 'Program recognition'], price: '$750' },
              { title: 'Silver Sponsor', benefits: ['Includes 4-some entry', 'Hole Sponsor included', 'Premium recognition'], price: '$1,000' },
              { title: 'Gold Sponsor', benefits: ['Includes 4-some entry', 'Hole Sponsor included', 'Name on towel'], price: '$1,500' },
              { title: 'Platinum Sponsor', benefits: ['Includes 4-some entry', 'Hole Sponsor included', 'Logo on towel'], price: '$2,500' }
            ].map((sponsor, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                <h3 className="text-2xl font-bold mb-2 text-fuchsia-300">{sponsor.title}</h3>
                <div className="text-3xl font-bold mb-4">{sponsor.price}</div>
                <ul className="space-y-2">
                  {sponsor.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-teal-300 flex-shrink-0" />
                      <span className="text-teal-100">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <TurtleLogo className="w-10 h-10 mr-3" />
                <div>
                  <h3 className="text-xl font-bold flex items-center">
                    Brynlee Carter Foundation
                  </h3>
                </div>
              </div>
              <p className="text-teal-200">
                A 501(c)(3) nonprofit organization dedicated to helping families with children who have complex medical conditions through financial support and community assistance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2 text-teal-200">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Chad Carter: 636-368-2059
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Kyle Ruediger: 314-952-9822
                </p>
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  408 Kayla Ct. Washington, MO 63090
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-teal-200">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Our Impact</a></li>
                <li><a href="#" className="hover:text-white transition">Past Tournaments</a></li>
                <li><a href="#" className="hover:text-white transition">Donate</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-teal-700 pt-8 text-center text-teal-300">
            <p>&copy; 2026 Brynlee Carter Foundation. All rights reserved. Tax ID: 12-3456789</p>
          </div>
        </div>
      </footer>
    </div>
  );
}