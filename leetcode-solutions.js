// 1. Two Sum
var twoSum = function (nums, target) {
    var numMap = {}, i = 0;
    for (let num of nums) {
        let other = target - num;
        if (!numMap.hasOwnProperty(other)) {
            return [numMap[other], i];
        }
        numMap[num] = i;
        i++;
    }
    return -1;
};
