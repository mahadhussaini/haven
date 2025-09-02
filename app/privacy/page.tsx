'use client'

import { Shield, Eye, Lock, Database, Users, Globe, Clock } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Shield className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600">How we protect and handle your personal information</p>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          Haven - Disaster & Climate Resilience Assistant (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
          disaster preparedness and climate resilience platform.
        </p>
        <p className="text-gray-700">
          By using our service, you agree to the collection and use of information in accordance with this policy. 
          If you do not agree with our policies and practices, please do not use our service.
        </p>
      </div>

      {/* Information We Collect */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-3">
              We may collect personal information that you voluntarily provide to us, including:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Name and contact information (email address, phone number)</li>
              <li>• Location data (city, coordinates) for personalized services</li>
              <li>• Emergency contact information</li>
              <li>• Preferences and settings for the application</li>
              <li>• Communication preferences</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Usage Information</h3>
            <p className="text-gray-700 mb-3">
              We automatically collect certain information about your use of our service:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Device information (browser type, operating system, device identifiers)</li>
              <li>• Usage patterns and feature interactions</li>
              <li>• Error logs and performance data</li>
              <li>• IP address and general location information</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Emergency Data</h3>
            <p className="text-gray-700 mb-3">
              In emergency situations, we may collect additional information:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Real-time location data for emergency alerts</li>
              <li>• Emergency response preferences</li>
              <li>• Communication history during emergencies</li>
              <li>• Safety status and well-being information</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How We Use Information */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Core Services</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Provide personalized disaster preparedness information</li>
              <li>• Generate location-specific risk assessments</li>
              <li>• Send emergency alerts and notifications</li>
              <li>• Deliver weather and climate data</li>
              <li>• Enable community collaboration features</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Service Improvement</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Analyze usage patterns and optimize performance</li>
              <li>• Develop new features and capabilities</li>
              <li>• Improve user experience and interface design</li>
              <li>• Conduct research on disaster preparedness</li>
              <li>• Enhance emergency response systems</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Emergency Situations</h4>
          <p className="text-sm text-blue-800">
            During emergencies, we may use your information to provide critical safety information, 
            coordinate with emergency services, and ensure your well-being. This includes sharing 
            necessary information with authorized emergency responders when required by law.
          </p>
        </div>
      </div>

      {/* Information Sharing */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="h-6 w-6 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">Information Sharing and Disclosure</h2>
        </div>
        
        <p className="text-gray-700 mb-4">
          We do not sell, trade, or otherwise transfer your personal information to third parties 
          except in the following circumstances:
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Emergency Services</h4>
            <p className="text-sm text-gray-700">
              We may share your information with emergency responders, government agencies, 
              and disaster relief organizations when necessary to protect public safety or 
              respond to emergencies.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Legal Requirements</h4>
            <p className="text-sm text-gray-700">
              We may disclose your information if required by law, court order, or government 
              regulation, or to protect our rights, property, or safety.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Service Providers</h4>
            <p className="text-sm text-gray-700">
              We may share information with trusted third-party service providers who assist 
              us in operating our platform, conducting business, or serving users.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Community Features</h4>
            <p className="text-sm text-gray-700">
              When you use community features, your public profile information may be visible 
              to other users. You control what information is shared in these public spaces.
            </p>
          </div>
        </div>
      </div>

      {/* Data Security */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Lock className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
        </div>
        
        <p className="text-gray-700 mb-4">
          We implement appropriate technical and organizational security measures to protect 
          your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Technical Safeguards</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Encryption of data in transit and at rest</li>
              <li>• Secure authentication and access controls</li>
              <li>• Regular security audits and vulnerability assessments</li>
              <li>• Secure data centers and infrastructure</li>
              <li>• Incident response and monitoring systems</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Organizational Measures</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Employee training on data protection</li>
              <li>• Access controls and authorization procedures</li>
              <li>• Regular privacy and security reviews</li>
              <li>• Incident response procedures</li>
              <li>• Compliance monitoring and reporting</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">Data Breach Response</h4>
          <p className="text-sm text-yellow-800">
            In the event of a data breach, we will notify affected users and relevant authorities 
            as required by law. We will take immediate steps to contain the breach and prevent 
            further unauthorized access.
          </p>
        </div>
      </div>

      {/* Data Retention */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Retention</h2>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            We retain your personal information only for as long as necessary to fulfill the 
            purposes outlined in this Privacy Policy, unless a longer retention period is required 
            or permitted by law.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Retention Periods</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Account information: Until account deletion</li>
                <li>• Usage data: 2 years for service improvement</li>
                <li>• Emergency data: 7 years for legal compliance</li>
                <li>• Communication logs: 1 year for support purposes</li>
                <li>• Analytics data: 3 years for trend analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Data Deletion</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• You can request deletion of your data</li>
                <li>• Automatic deletion after retention periods</li>
                <li>• Secure destruction of deleted data</li>
                <li>• Backup data retention for disaster recovery</li>
                <li>• Legal hold exceptions when required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Access and Control</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate or incomplete data</li>
              <li>• Request deletion of your data</li>
              <li>• Export your data in portable format</li>
              <li>• Restrict processing of your data</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Communication Preferences</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Opt out of marketing communications</li>
              <li>• Control notification settings</li>
              <li>• Manage emergency alert preferences</li>
              <li>• Choose data sharing options</li>
              <li>• Set privacy and security preferences</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">Exercising Your Rights</h4>
          <p className="text-sm text-green-800">
            To exercise your privacy rights, contact us at privacy@haven-resilience.org. 
            We will respond to your request within 30 days and may request additional 
            information to verify your identity.
          </p>
        </div>
      </div>

      {/* International Transfers */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">International Data Transfers</h2>
        </div>
        
        <p className="text-gray-700 mb-4">
          Your information may be transferred to and processed in countries other than your own. 
          We ensure that such transfers comply with applicable data protection laws and provide 
          adequate protection for your personal information.
        </p>

        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Data processing in the United States and European Union</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Compliance with GDPR and other international privacy laws</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Standard contractual clauses for data protection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Local data storage when required by law</span>
          </div>
        </div>
      </div>

      {/* Children's Privacy */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Children&apos;s Privacy</h2>
        
        <p className="text-gray-700 mb-4">
          Our service is not intended for children under 13 years of age. We do not knowingly 
          collect personal information from children under 13. If you are a parent or guardian 
          and believe your child has provided us with personal information, please contact us.
        </p>

        <div className="p-4 bg-orange-50 rounded-lg">
          <h4 className="font-medium text-orange-900 mb-2">Age Verification</h4>
          <p className="text-sm text-orange-800">
            Users must be at least 13 years old to create an account. We may implement 
            age verification measures and will delete any accounts found to be created 
            by users under 13.
          </p>
        </div>
      </div>

      {/* Changes to Policy */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
        
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our 
          practices, technology, legal requirements, or other factors. We will notify you 
          of any material changes by:
        </p>

        <ul className="space-y-2 text-gray-700 mb-4">
          <li>• Posting the updated policy on our website</li>
          <li>• Sending email notifications to registered users</li>
          <li>• Displaying prominent notices in the application</li>
          <li>• Requiring consent for significant changes</li>
        </ul>

        <p className="text-gray-700">
          Your continued use of our service after any changes indicates your acceptance 
          of the updated Privacy Policy.
        </p>
      </div>

      {/* Contact Information */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
        
        <p className="text-gray-700 mb-4">
          If you have any questions about this Privacy Policy or our data practices, 
          please contact us:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Privacy Team</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Email: privacy@haven-resilience.org</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Resilience Way, Safety City, SC 12345</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Data Protection Officer</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Email: dpo@haven-resilience.org</p>
              <p>For GDPR and EU privacy inquiries</p>
              <p>Response within 72 hours</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Complaints</h4>
          <p className="text-sm text-blue-800">
            If you believe we have not addressed your privacy concerns adequately, you may 
            file a complaint with your local data protection authority or supervisory body.
          </p>
        </div>
      </div>
    </div>
  )
}
