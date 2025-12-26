
  // 🔍 Read AsyncStorage ONCE
            const storedData = await AsyncStorage.getItem('userData');
            console.log('📦 AsyncStorage userData:', storedData);

            if (!storedData) {
                // 🔴 No stored user → Login
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
                return;
            }

            // 🟢 Safe parse
            const parsedData = JSON.parse(storedData);
            console.log('👤 Employee ID:', parsedData.emp_code);

            // 🟢 Update context
            setEmployeeId(parsedData.emp_code);

            const response = await loginUser(
                parsedData.emp_code,
                parsedData.emp_pass   // ⚠️ make sure key name is correct
            );