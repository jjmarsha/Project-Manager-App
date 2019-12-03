package finalproj;

import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.ResultSet;

public class userSQLImplement implements userSQLInfo {
	static Connection connection;
	static PreparedStatement ps;

	@Override
	public void insertTask(Task t) {
		try {
			connection = SQLConnect.getCon();
			ps = connection.prepareStatement(
					"INSERT INTO task(taskName, date, description, projectID, status) VALUES (?,?,?,?,?)");
			ps.setString(1, t.getName());
			ps.setString(2, t.getDate());
			ps.setString(3, t.getDescription());
			ps.setString(4, t.getProjID());
			ps.setString(5, t.getStatus());
			ps.executeUpdate();
			ps.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void editTask(Task newTask) {
		try {
			connection = SQLConnect.getCon();
			ps = connection
					.prepareStatement("UPDATE task SET taskName=?, date=?, description=?, status=? WHERE taskID=?");
			ps.setString(1, newTask.getName());
			ps.setString(2, newTask.getDate());
			ps.setString(3, newTask.getDescription());
			ps.setString(4, newTask.getStatus());
			ps.setString(5, newTask.getTaskID());

			ps.executeUpdate();
			ps.close();

		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	public String getProjID(String taskID) {
		String projectID = "";
		try {
			connection = SQLConnect.getCon();
			ps = connection.prepareStatement("SELECT projectID FROM task WHERE taskID=?");
			ps.setString(1, taskID);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				projectID = rs.getString(5);
			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return projectID;

	}

	public void remTask(String taskID) {
		try {
			connection = SQLConnect.getCon();
			ps = connection.prepareStatement("DELETE FROM task WHERE taskID=?");
			ps.setInt(1, Integer.parseInt(taskID));

			ps.executeUpdate();
			ps.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
