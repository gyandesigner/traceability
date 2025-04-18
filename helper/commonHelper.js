const camelCaseName = (name) =>  {
    const words = name.split(' ');
    const capitalizedWords = words.map(word => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return ''; 
    });
    return capitalizedWords.join(' ');
}

export default {
    camelCaseName
};
