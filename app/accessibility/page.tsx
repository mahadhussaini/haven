'use client'

import { Accessibility, Eye, Ear, Hand, Brain, CheckCircle, AlertTriangle, Settings, Users } from 'lucide-react'

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Accessibility className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accessibility</h1>
          <p className="text-gray-600">Making disaster preparedness accessible to everyone</p>
        </div>
      </div>

      {/* Commitment Statement */}
      <div className="card mb-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Accessibility Commitment</h2>
          <p className="text-gray-700 mb-4">
            Haven is committed to ensuring that our disaster preparedness and climate resilience 
            platform is accessible to all users, including those with disabilities. We believe 
            that emergency information and preparedness tools should be available to everyone, 
            regardless of their abilities or assistive technology needs.
          </p>
          <p className="text-gray-700">
            We strive to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1 
            Level AA standards and continuously work to improve the accessibility of our platform.
          </p>
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Accessibility Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-center mb-3">
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-blue-900 mb-2">Visual Accessibility</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• High contrast mode</li>
              <li>• Adjustable font sizes</li>
              <li>• Screen reader support</li>
              <li>• Color-blind friendly design</li>
            </ul>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex justify-center mb-3">
              <Ear className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-900 mb-2">Audio Accessibility</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Audio alerts and notifications</li>
              <li>• Text-to-speech support</li>
              <li>• Caption support for videos</li>
              <li>• Volume controls</li>
            </ul>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="flex justify-center mb-3">
              <Hand className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-900 mb-2">Motor Accessibility</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Keyboard navigation</li>
              <li>• Voice control support</li>
              <li>• Large touch targets</li>
              <li>• Gesture alternatives</li>
            </ul>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="flex justify-center mb-3">
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-orange-900 mb-2">Cognitive Accessibility</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Clear, simple language</li>
              <li>• Consistent navigation</li>
              <li>• Error prevention</li>
              <li>• Help and guidance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* WCAG Compliance */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">WCAG 2.1 Level AA Compliance</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Perceivable</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">✅ Implemented</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Alternative text for images</li>
                  <li>• Captions for multimedia</li>
                  <li>• Adaptable content structure</li>
                  <li>• Distinguishable content</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🔄 In Progress</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Audio descriptions for videos</li>
                  <li>• Sign language interpretation</li>
                  <li>• Enhanced color contrast</li>
                  <li>• Text spacing options</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Operable</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">✅ Implemented</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Keyboard accessible navigation</li>
                  <li>• Sufficient time for tasks</li>
                  <li>• No content that causes seizures</li>
                  <li>• Navigable content structure</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🔄 In Progress</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Voice command integration</li>
                  <li>• Motion actuation alternatives</li>
                  <li>• Enhanced keyboard shortcuts</li>
                  <li>• Focus management improvements</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Understandable</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">✅ Implemented</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Readable and understandable text</li>
                  <li>• Predictable navigation</li>
                  <li>• Input assistance and error handling</li>
                  <li>• Consistent interface elements</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🔄 In Progress</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Enhanced help documentation</li>
                  <li>• Context-sensitive assistance</li>
                  <li>• Progressive disclosure</li>
                  <li>• Learning path guidance</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Robust</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">✅ Implemented</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Compatible with assistive technologies</li>
                  <li>• Valid HTML and CSS</li>
                  <li>• Semantic markup structure</li>
                  <li>• ARIA labels and roles</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🔄 In Progress</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Enhanced ARIA implementation</li>
                  <li>• Custom component accessibility</li>
                  <li>• Third-party integration testing</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assistive Technology Support */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Assistive Technology Support</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Screen Readers</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• JAWS (Windows)</li>
              <li>• NVDA (Windows)</li>
              <li>• VoiceOver (macOS/iOS)</li>
              <li>• TalkBack (Android)</li>
              <li>• Orca (Linux)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Voice Control</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Dragon NaturallySpeaking</li>
              <li>• Voice Control (macOS)</li>
              <li>• Voice Access (Android)</li>
              <li>• Windows Speech Recognition</li>
              <li>• Browser voice commands</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Magnification</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Windows Magnifier</li>
              <li>• macOS Zoom</li>
              <li>• Browser zoom controls</li>
              <li>• High DPI display support</li>
              <li>• Custom magnification tools</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Switch Control</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Switch Access (Android)</li>
              <li>• Switch Control (iOS)</li>
              <li>• Windows Switch Control</li>
              <li>• External switch devices</li>
              <li>• Eye tracking systems</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Accessibility Settings</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Visual Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">High Contrast Mode</h4>
                <p className="text-sm text-gray-600">Enhanced contrast for better visibility</p>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                  Enable
                </button>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Font Size</h4>
                <p className="text-sm text-gray-600">Adjustable text sizing options</p>
                <div className="mt-2 flex space-x-2">
                  <button className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">A-</button>
                  <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded">A</button>
                  <button className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">A+</button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Audio Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Audio Alerts</h4>
                <p className="text-sm text-gray-600">Sound notifications for important events</p>
                <button className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                  Enabled
                </button>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Text-to-Speech</h4>
                <p className="text-sm text-gray-600">Read content aloud automatically</p>
                <button className="mt-2 px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">
                  Disabled
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Navigation Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Keyboard Navigation</h4>
                <p className="text-sm text-gray-600">Enhanced keyboard shortcuts</p>
                <button className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                  Enabled
                </button>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Focus Indicators</h4>
                <p className="text-sm text-gray-600">Clear focus highlighting</p>
                <button className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                  Enabled
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testing and Compliance */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Testing and Compliance</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Testing Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Automated Testing</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• axe-core accessibility testing</li>
                  <li>• Lighthouse accessibility audits</li>
                  <li>• HTML validation and linting</li>
                  <li>• CSS accessibility checks</li>
                  <li>• Color contrast analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Manual Testing</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Screen reader testing</li>
                  <li>• Keyboard navigation testing</li>
                  <li>• Color blindness simulation</li>
                  <li>• Mobile accessibility testing</li>
                  <li>• User experience testing</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Compliance Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-900">WCAG 2.1 AA</div>
                <div className="text-sm text-green-700">Fully Compliant</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-900">Section 508</div>
                <div className="text-sm text-blue-700">Compliant</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-purple-900">ADA Title III</div>
                <div className="text-sm text-purple-700">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback and Support */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Feedback and Support</h2>
        </div>
        
        <div className="space-y-6">
          <p className="text-gray-700">
            We welcome feedback on the accessibility of our platform. If you encounter 
            accessibility barriers or have suggestions for improvement, please contact us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Accessibility Team</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: accessibility@haven-resilience.org</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Response time: Within 48 hours</p>
                <p>Priority: High for accessibility issues</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Support Channels</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Accessibility feedback form</p>
                <p>• Dedicated accessibility hotline</p>
                <p>• Video call support (ASL available)</p>
                <p>• Community accessibility forum</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Reporting Accessibility Issues</h4>
            <p className="text-sm text-blue-800">
              When reporting accessibility issues, please include: the page URL, description 
              of the problem, your assistive technology, browser/device information, and 
              steps to reproduce the issue.
            </p>
          </div>
        </div>
      </div>

      {/* Future Improvements */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Future Accessibility Improvements</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Planned Enhancements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Short Term (3-6 months)</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Enhanced ARIA implementation</li>
                  <li>• Improved keyboard navigation</li>
                  <li>• Better focus management</li>
                  <li>• Enhanced color contrast</li>
                  <li>• Audio description support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Long Term (6-12 months)</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Voice control integration</li>
                  <li>• Gesture-based navigation</li>
                  <li>• AI-powered accessibility features</li>
                  <li>• Multi-language accessibility</li>
                  <li>• Offline accessibility support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Continuous Improvement</h4>
            <p className="text-sm text-green-800">
              We are committed to continuously improving the accessibility of our platform. 
              Our accessibility team regularly reviews user feedback, conducts audits, and 
              implements improvements based on the latest accessibility standards and best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
