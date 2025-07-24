// Simple test script for formatSize function
// This is just for testing and can be deleted after verification

// Copy of the formatSize function for testing
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  if (bytes < 0) return 'Invalid size';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  // Ensure we don't exceed the available units
  const unitIndex = Math.min(i, units.length - 1);
  
  // Convert to the appropriate unit and round to 2 decimal places
  const size = bytes / Math.pow(1024, unitIndex);
  
  // Format with 2 decimal places for larger units, but remove trailing zeros
  return `${size.toFixed(unitIndex === 0 ? 0 : 2).replace(/\.0+$/, '').replace(/(\.\d+)0$/, '$1')} ${units[unitIndex]}`;
}

// Test cases
const testCases = [
  { input: 0, expected: '0 B' },
  { input: -10, expected: 'Invalid size' },
  { input: 500, expected: '500 B' },
  { input: 1023, expected: '1023 B' },
  { input: 1024, expected: '1 KB' },
  { input: 1536, expected: '1.5 KB' },
  { input: 1048576, expected: '1 MB' },
  { input: 1572864, expected: '1.5 MB' },
  { input: 1073741824, expected: '1 GB' },
  { input: 1610612736, expected: '1.5 GB' },
  { input: 1099511627776, expected: '1 TB' },
];

// Run tests
console.log('Testing formatSize function:');
console.log('----------------------------');

let allPassed = true;

testCases.forEach(test => {
  const result = formatSize(test.input);
  const passed = result === test.expected;
  
  console.log(`Input: ${test.input} bytes`);
  console.log(`Expected: "${test.expected}"`);
  console.log(`Result: "${result}"`);
  console.log(`Test ${passed ? 'PASSED' : 'FAILED'}`);
  console.log('----------------------------');
  
  if (!passed) {
    allPassed = false;
  }
});

console.log(`Overall result: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);