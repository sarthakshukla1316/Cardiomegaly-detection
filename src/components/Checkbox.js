import React from 'react'

const Checkbox = ({ title }) => {
    return (
        <div class="flex items-center">
            <input id="link-checkbox" type="checkbox" value="" class="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {title}
            </label>
        </div>
    )
}

export default Checkbox