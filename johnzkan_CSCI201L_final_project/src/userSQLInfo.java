public interface userSQLInfo {

	void insertTask(Task t);
	void editTask(Task newTask);
	void remTask(String taskID);
	String getProjID(String taskID);

}

