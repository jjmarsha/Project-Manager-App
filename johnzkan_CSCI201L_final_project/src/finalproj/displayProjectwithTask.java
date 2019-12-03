package finalproj;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Servlet implementation class displayProjectwithTask
 */
@WebServlet("/displayProjectwithTask")
public class displayProjectwithTask extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public static final String CREDENTIALS_STRING = "jdbc:mysql://google/spoolDB?cloudSqlInstance=projectmanagement-259305:us-west1:projectmanagement&socketFactory=com.google.cloud.sql.mysql.SocketFactory&useSSL=false&user=projectManagement&password=CSCI201";
	static Connection connection = null;

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		ArrayList<HashMap<String, String>> dataMap = new ArrayList<>();
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(CREDENTIALS_STRING);
			HttpSession session = request.getSession();
//			int projectID = (int) session.getAttribute("projectID");
			int projectID = Integer.parseInt(request.getParameter("projectID"));
//			projectID = 1;
			PreparedStatement loadTask = connection.prepareStatement("SELECT * FROM task WHERE projectID = ?");
			loadTask.setInt(1, projectID);
			ResultSet rs = loadTask.executeQuery();
			while (rs.next()) {
				HashMap<String, String> data1 = new HashMap<String, String>();
				String taskName = rs.getString("taskName");
				data1.put("taskName", taskName);
				Timestamp date = rs.getTimestamp("date");
				data1.put("date", date.toString());
				String description = rs.getString("description");
				data1.put("description", description);
				int status = rs.getInt("status");
				data1.put("status", Integer.toString(status));
				int taskID = rs.getInt("taskID");
				data1.put("taskID", Integer.toString(taskID));
				dataMap.add(data1);
			}
			List<JSONObject> jsonObj = new ArrayList<JSONObject>();
			for (HashMap<String, String> data : dataMap) {
				JSONObject obj = new JSONObject(data);
				jsonObj.add(obj);
			}
			JSONArray test = new JSONArray(jsonObj);
			response.getWriter().write(test.toString());
			//where is the redirect?
			connection.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
