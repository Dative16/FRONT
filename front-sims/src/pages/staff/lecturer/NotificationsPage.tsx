import React from 'react';

const NotificationsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Manage and send notifications to students and colleagues.</p>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Unread</h3>
          <p className="text-2xl font-bold text-red-600">8</p>
          <p className="text-xs text-gray-500 mt-1">New notifications</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Sent Today</h3>
          <p className="text-2xl font-bold text-green-600">15</p>
          <p className="text-xs text-gray-500 mt-1">Messages delivered</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pending</h3>
          <p className="text-2xl font-bold text-orange-600">3</p>
          <p className="text-xs text-gray-500 mt-1">Scheduled notifications</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600 mb-2">This Week</h3>
          <p className="text-2xl font-bold text-blue-600">42</p>
          <p className="text-xs text-gray-500 mt-1">Total sent</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create New Notification */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Notification</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option>Select recipients</option>
                  <option>All my students</option>
                  <option>CS301 - Database Systems</option>
                  <option>CS451 - Software Engineering</option>
                  <option>CS262 - Data Structures</option>
                  <option>IPT Students</option>
                  <option>Custom list</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Enter notification subject"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Enter your message..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="schedule" className="rounded focus:ring-blue-500" />
                <label htmlFor="schedule" className="text-sm text-gray-700">Schedule for later</label>
              </div>

              <div className="flex space-x-3">
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-lg"
                >
                  Send Now
                </button>
                <button 
                  type="button" 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-xl shadow border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
                <div className="text-sm font-medium text-gray-900">Assignment Reminder</div>
                <div className="text-xs text-gray-500 mt-1">Send to students with pending submissions</div>
              </button>
              <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
                <div className="text-sm font-medium text-gray-900">Class Announcement</div>
                <div className="text-xs text-gray-500 mt-1">Notify about schedule changes</div>
              </button>
              <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
                <div className="text-sm font-medium text-gray-900">Grade Release</div>
                <div className="text-xs text-gray-500 mt-1">Inform students about new grades</div>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
                <div className="flex flex-wrap gap-3">
                  <button className="text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-md">
                    Mark all read
                  </button>
                  <select className="border border-gray-300 rounded-xl px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option>All notifications</option>
                    <option>Unread</option>
                    <option>Sent</option>
                    <option>Received</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {/* Unread notification */}
                <div className="p-5 bg-blue-50 border-l-4 border-blue-400 hover:bg-blue-100 transition-colors duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2.5"></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-gray-900">System Alert</h3>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Grade submission deadline reminder: CS301 Database Systems final grades due tomorrow.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full">High Priority</span>
                        <button className="text-xs text-blue-600 hover:underline">Mark as read</button>
                        <button className="text-xs text-gray-600 hover:underline">Archive</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student message */}
                <div className="p-5 hover:bg-gray-50 transition-colors duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2.5"></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-gray-900">Student Inquiry</h3>
                        <span className="text-xs text-gray-500">5 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        John Mwangi (CA/CSC/19/023) sent a message about CS301 assignment clarification.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">Student Message</span>
                        <button className="text-xs text-blue-600 hover:underline">Reply</button>
                        <button className="text-xs text-gray-600 hover:underline">Archive</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sent notification */}
                <div className="p-5 hover:bg-gray-50 transition-colors duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5"></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-gray-900">Assignment Reminder Sent</h3>
                        <span className="text-xs text-gray-500">1 day ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Reminder sent to 45 students about CS301 Database Design assignment due date.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">Sent</span>
                        <span className="text-xs text-gray-500">45 recipients</span>
                        <button className="text-xs text-gray-600 hover:underline">View Report</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department announcement */}
                <div className="p-5 hover:bg-gray-50 transition-colors duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2.5"></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-gray-900">Department Meeting</h3>
                        <span className="text-xs text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Faculty meeting scheduled for Friday, March 20th at 2:00 PM - Conference Room A.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">Department</span>
                        <button className="text-xs text-blue-600 hover:underline">Add to calendar</button>
                        <button className="text-xs text-gray-600 hover:underline">RSVP</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grade feedback */}
                <div className="p-5 hover:bg-gray-50 transition-colors duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5"></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-gray-900">Grade Feedback Received</h3>
                        <span className="text-xs text-gray-500">3 days ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        3 students provided feedback on CS451 Software Engineering midterm grading.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full">Feedback</span>
                        <button className="text-xs text-blue-600 hover:underline">View feedback</button>
                        <button className="text-xs text-gray-600 hover:underline">Dismiss</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;