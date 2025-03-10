class goalDTO {
    constructor(goal) {
      this.goalId = goal._id;
      this.description = goal.description;
      this.status = goal.status;
      this.progress = goal.progress;
      this.notifications = goal.notifications;
    }
  
    static from(data) {
        return Array.isArray(data) 
          ? data.map(item => new goalDTO(item)) 
          : [new goalDTO(data)]; 
      }
  }

export default goalDTO; 
