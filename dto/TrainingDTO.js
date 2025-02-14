class TrainingDTO {
    constructor(training) {
      this.trainingid = training._id;
      this.date = new Date(training.date).toISOString();
      this.techniques = training.techniques || [];
      this.durationMinutes = training.durationMinutes;
      this.intensityLevel = training.intensityLevel;
      this.notes = training.notes;
    }
  
    static from(data) {
        return Array.isArray(data) 
          ? data.map(item => new TrainingDTO(item))
          : [new TrainingDTO(data)]; 
      }
  }
  
  export default TrainingDTO;
  