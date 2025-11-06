export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold font-inter text-black dark:text-white mb-8">
          Contact Us
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold font-inter text-black dark:text-white mb-2">
            Media Project Research Team
          </h2>
          <p className="text-base font-inter text-gray-700 dark:text-gray-300 mb-6">
            Project: Usability Evaluation of Interactivity and Storytelling in the context of Data Stories
          </p>
          <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-3">Authors</h3>
          <div className="space-y-2 text-lg font-inter text-gray-700 dark:text-gray-300">
            <p>MUHAMMAD BEHZAD HUSSAIN</p>
            <p>JAWAD</p>
          </div>
        </div>
      </div>
    </div>
  )
}
