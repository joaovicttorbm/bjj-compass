import { sendEmail } from "../mailers/mailer.js";
import { goalCompletionEmailTemplate } from "../mailers/templates/template.js";
import goalRepository from "../repository/goalRepository.js";
import userRepository from "../repository/userRepository.js";

const validateGoalStatus = (goalData) => {
  if (goalData.status === 'completed' && goalData.progress < 100) {
    throw new BadRequestException(
      'Status cannot be "completed" unless progress is 100%',
      ErrorCode.INVALID_GOAL_STATUS
    );
  }
};

const createGoal = async (goalData) => {
  validateGoalStatus(goalData);
  return await goalRepository.createGoal(goalData);
};

const getGoalsByUser = async (userId) => {
  return await goalRepository.findGoalsByUser(userId);
};

const getGoalsByFilter = async (userId, filters) => {
  return await goalRepository.findGoalsByFilter(userId, filters);
};

const getGoalIdByUser = async (goalId, userId) => {
  return await goalRepository.findGoalById(goalId, userId);
};

const updateGoal = async (goalId, userId, goalData) => {

  const goal = await goalRepository.updateGoal(goalId, userId, goalData);
  if(goalData.status === "completed"){ 
    const user = await userRepository.findUserById(userId);
    const completionEmail = goalCompletionEmailTemplate(user.username, goalData.description);
    await sendEmail({
      to: user.email, 
      ...completionEmail
    });
    return {
      goal, 
      emailSent: {
        to: user.email,
        subject: completionEmail.subject,
        text: completionEmail.text,
        html: completionEmail.html,
      },
    }
  }
  return goal;
}; 

const deleteGoal = async (goalId, userId) => {
  return await goalRepository.deleteGoal(goalId, userId);
};

export default {
  createGoal,
  getGoalsByUser,
  updateGoal,
  getGoalIdByUser,
  getGoalsByFilter,
  deleteGoal,
  };