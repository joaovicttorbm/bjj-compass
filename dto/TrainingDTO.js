class TrainingDTO {
    constructor(Training) {
      this.id = _id;
      this.date = new Date(date).toISOString();
      this.techniques = techniques || [];
      this.durationMinutes = durationMinutes;
      this.intensityLevel = intensityLevel;
      this.notes = notes;
    }
  
    static from(data) {
        return Array.isArray(data) 
          ? data.map(item => new GoalDTO(item))
          : [new GoalDTO(data)]; 
      }
  }
  
  export default TrainingDTO;
  