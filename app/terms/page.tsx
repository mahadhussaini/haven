'use client'

import { FileText, Shield, Users, Globe, AlertTriangle, Clock, Mail } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <FileText className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600">Terms and conditions for using Haven Disaster & Climate Resilience Assistant</p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="card mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Last updated: January 15, 2024</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          Welcome to Haven - Disaster & Climate Resilience Assistant (&ldquo;Service,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). 
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our disaster preparedness and climate 
          resilience platform.
        </p>
        <p className="text-gray-700 mb-4">
          By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
          with any part of these terms, then you may not access the Service.
        </p>
        <p className="text-gray-700">
          These Terms apply to all visitors, users, and others who access or use the Service.
        </p>
      </div>

      {/* Service Description */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">2. Service Description</h2>
        </div>
        
        <p className="text-gray-700 mb-4">
          Haven provides a comprehensive disaster preparedness and climate resilience platform that includes:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Core Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Real-time disaster alerts and warnings</li>
              <li>• Weather and climate data</li>
              <li>• Risk assessment tools</li>
              <li>• Emergency planning resources</li>
              <li>• Community collaboration features</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Data Sources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Government weather services</li>
              <li>• Geological survey data</li>
              <li>• Satellite observations</li>
              <li>• Emergency management agencies</li>
              <li>• Climate research institutions</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Important Notice</h4>
          <p className="text-sm text-blue-800">
            While we strive to provide accurate and timely information, our Service is for 
            educational and preparedness purposes only. Always follow official emergency 
            instructions from local authorities during actual disasters.
          </p>
        </div>
      </div>

      {/* User Accounts */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">3. User Accounts</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Account Creation</h3>
            <p className="text-gray-700 mb-3">
              To access certain features of our Service, you may be required to create an account. 
              You agree to provide accurate, current, and complete information during registration.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• You must be at least 13 years old to create an account</li>
              <li>• You are responsible for maintaining the security of your account</li>
              <li>• You are responsible for all activities that occur under your account</li>
              <li>• You must notify us immediately of any unauthorized use</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Account Responsibilities</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Keep your login credentials secure and confidential</li>
              <li>• Update your account information as needed</li>
              <li>• Use the Service in compliance with these Terms</li>
              <li>• Report any security concerns immediately</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acceptable Use */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Permitted Uses</h3>
            <p className="text-gray-700 mb-3">You may use our Service for:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Personal disaster preparedness and planning</li>
              <li>• Educational and research purposes</li>
              <li>• Community emergency coordination</li>
              <li>• Professional emergency management activities</li>
              <li>• Non-commercial climate resilience initiatives</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Prohibited Uses</h3>
            <p className="text-gray-700 mb-3">You may not use our Service to:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Violate any applicable laws or regulations</li>
              <li>• Harm, threaten, or harass others</li>
              <li>• Spread false or misleading emergency information</li>
              <li>• Interfere with emergency response operations</li>
              <li>• Access or attempt to access unauthorized areas</li>
              <li>• Use automated systems to access the Service</li>
              <li>• Reverse engineer or attempt to extract source code</li>
            </ul>
          </div>

          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Emergency Information Misuse</h4>
            <p className="text-sm text-red-800">
              Intentionally spreading false emergency information or interfering with 
              emergency response operations is strictly prohibited and may result in 
              immediate account termination and legal action.
            </p>
          </div>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Our Rights</h3>
            <p className="text-gray-700 mb-3">
              The Service and its original content, features, and functionality are and will remain 
              the exclusive property of Haven and its licensors. The Service is protected by copyright, 
              trademark, and other laws.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Your Content</h3>
            <p className="text-gray-700 mb-3">
              You retain ownership of any content you submit, post, or display on or through the Service. 
              By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, 
              reproduce, modify, and distribute your content in connection with the Service.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Third-Party Content</h3>
            <p className="text-gray-700 mb-3">
              Our Service may contain content from third-party sources. We respect intellectual property 
              rights and expect users to do the same. If you believe your work has been copied in a way 
              that constitutes copyright infringement, please contact us.
            </p>
          </div>
        </div>
      </div>

      {/* Data and Privacy */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data and Privacy</h2>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            Your privacy is important to us. Our collection and use of personal information is 
            governed by our Privacy Policy, which is incorporated into these Terms by reference.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Data Collection</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Location data for personalized services</li>
                <li>• Usage information for service improvement</li>
                <li>• Emergency contact information</li>
                <li>• Communication preferences</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Data Protection</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Encryption of sensitive data</li>
                <li>• Secure data storage practices</li>
                <li>• Limited access to personal information</li>
                <li>• Compliance with privacy regulations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
          <h2 className="text-xl font-semibold text-gray-900">7. Disclaimers and Limitations</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Service Availability</h3>
            <p className="text-gray-700">
              We strive to maintain high service availability, but we do not guarantee that the Service 
              will be available at all times. The Service may be temporarily unavailable due to maintenance, 
              updates, or technical issues.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Information Accuracy</h3>
            <p className="text-gray-700">
              While we work with reliable data sources, we cannot guarantee the accuracy, completeness, 
              or timeliness of information provided through our Service. Users should verify critical 
              information with official sources.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Emergency Situations</h3>
            <p className="text-gray-700">
              Our Service is not a substitute for official emergency communications. During actual 
              disasters, always follow instructions from local emergency management authorities, 
              law enforcement, and other official sources.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">No Warranty</h4>
            <p className="text-sm text-yellow-800">
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF 
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </div>
        </div>
      </div>

      {/* Limitation of Liability */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
        
        <div className="space-y-4">
          <p className="text-gray-700 mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL HAVEN, ITS DIRECTORS, 
            EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Excluded Damages</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Loss of profits or business opportunities</li>
                <li>• Data loss or corruption</li>
                <li>• Personal injury or property damage</li>
                <li>• Emotional distress or mental anguish</li>
                <li>• Any other indirect or consequential losses</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Liability Cap</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Maximum liability limited to $100</li>
                <li>• No liability for third-party actions</li>
                <li>• Force majeure events excluded</li>
                <li>• Emergency situations excluded</li>
                <li>• Government action exclusions</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Emergency Exclusions</h4>
            <p className="text-sm text-red-800">
              We are not liable for any damages arising from emergency situations, natural disasters, 
              or other events beyond our control. Users assume all risks associated with emergency 
              preparedness and response activities.
            </p>
          </div>
        </div>
      </div>

      {/* Termination */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Termination</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Termination by You</h3>
            <p className="text-gray-700">
              You may terminate your account at any time by contacting us or using the account 
              deletion feature in your settings. Upon termination, your right to use the Service 
              will cease immediately.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Termination by Us</h3>
            <p className="text-gray-700">
              We may terminate or suspend your account immediately, without prior notice or liability, 
              for any reason, including if you breach these Terms.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Effect of Termination</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Your account will be deactivated</li>
              <li>• Access to the Service will be revoked</li>
              <li>• Your data will be deleted within 30 days</li>
              <li>• Emergency alerts will be discontinued</li>
              <li>• Community access will be terminated</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Governing Law */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">10. Governing Law and Disputes</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Governing Law</h3>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws of the 
              State of California, United States, without regard to its conflict of law provisions.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Dispute Resolution</h3>
            <p className="text-gray-700 mb-3">
              Any disputes arising from these Terms or your use of the Service shall be resolved 
              through the following process:
            </p>
            <ol className="space-y-2 text-sm text-gray-600">
              <li>1. Informal negotiation and discussion</li>
              <li>2. Mediation with a neutral third party</li>
              <li>3. Binding arbitration in California</li>
              <li>4. Court proceedings only if arbitration fails</li>
            </ol>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Class Action Waiver</h4>
            <p className="text-sm text-blue-800">
              You agree that any disputes will be resolved individually, and you waive any right 
              to participate in a class action lawsuit or class-wide arbitration.
            </p>
          </div>
        </div>
      </div>

      {/* Changes to Terms */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
        
        <div className="space-y-4">
          <p className="text-gray-700 mb-4">
            We reserve the right to modify or replace these Terms at any time. If a revision is 
            material, we will provide at least 30 days notice prior to any new terms taking effect.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Notification Methods</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Email notifications to registered users</li>
                <li>• In-app notifications and banners</li>
                <li>• Website announcements</li>
                <li>• Social media updates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Your Options</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Accept the new terms and continue using the Service</li>
                <li>• Reject the new terms and terminate your account</li>
                <li>• Contact us with questions or concerns</li>
                <li>• Request clarification on specific changes</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Continued Use</h4>
            <p className="text-sm text-green-800">
              Your continued use of the Service after any changes to these Terms constitutes 
              acceptance of the new terms. If you do not agree to the new terms, you must 
              stop using the Service.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Mail className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">12. Contact Information</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please contact us:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Legal Department</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: legal@haven-resilience.org</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Resilience Way, Safety City, SC 12345</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Customer Support</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: support@haven-resilience.org</p>
                <p>For general questions and technical support</p>
                <p>Response within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Effective Date</h4>
            <p className="text-sm text-gray-700">
              These Terms of Service are effective as of January 15, 2024, and replace any 
              previous terms or agreements between you and Haven regarding the Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
