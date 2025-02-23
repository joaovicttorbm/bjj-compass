class trainingDTO {
    constructor(training) {
      this.trainingId = training._id;
      this.date = new Date(training.date).toISOString();
      this.techniques = training.techniques || [];
      this.durationMinutes = training.durationMinutes;
      this.intensityLevel = training.intensityLevel;
      this.notes = training.notes;
    }
  
    static from(data) {
        return Array.isArray(data) 
          ? data.map(item => new trainingDTO(item))
          : [new trainingDTO(data)]; 
      }
  }
  
  export default trainingDTO;
  
