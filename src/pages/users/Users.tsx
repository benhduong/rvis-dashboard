import {
  Card,
  Table,
  Text,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Grid,
  GridItem,
  Link,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import UserModal from "../../components/ui/UserModal";
import { PiFlag } from "react-icons/pi";
import FlagModal from "../../components/ui/FlagModal";

export interface User {
  username: string;
  points: number;
  email?: string;
  flag?: string;
  num_corr_trials: number;
  num_total_trials: number;
}

export interface AllUsersResponse {
  users: User[];
}

interface Statistic {
  caption: string;
  evaluate: (users: User[]) => number;
}

const statistics: Statistic[] = [
  {
    caption: "Number of Users",
    evaluate: (users: User[]) => users.length,
  },
  {
    caption: "Average Score",
    evaluate: (users: User[]) =>
      Math.round(
        (users.map((user: User) => user.points).reduce((a, b) => a + b, 0) /
          users.length) *
          100
      ) / 100,
  },
  {
    caption: "Highest Score",
    evaluate: (users: User[]) =>
      Math.round(Math.max(...users.map((user: User) => user.points)) * 100) /
      100,
  },
];

const API_ENDPOINT = "https://rvis.clps.brown.edu/backend";

const Users = () => {
  const userModalDisclosure = useDisclosure();
  const flagModalDisclosure = useDisclosure();
  const [users, setUsers] = useState<User[]>([]);
  const [justModified, setJustModified] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    setJustModified(false);
    fetch(API_ENDPOINT + "/allUsers")
      .then((res) => res.json())
      .then((res: AllUsersResponse) => {
        setUsers(res.users);
      })
      .catch(console.error);
  }, [setUsers, justModified]);

  const deleteUser = (username: string) => {
    fetch(API_ENDPOINT + "/deleteUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    })
      .then((res) => {
        if (res.ok) {
          setJustModified(true);
          userModalDisclosure.onClose();
        }
      })
      .catch(console.error);
  };

  const setFlag = (username: string, reason: string) => {
    fetch(API_ENDPOINT + "/setFlag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, reason: reason }),
    })
      .then((res) => {
        if (res.ok) {
          setJustModified(true);
          flagModalDisclosure.onClose();
        }
      })
      .catch(console.error);
  };

  const deleteFlag = (username: string) => {
    fetch(API_ENDPOINT + "/deleteFlag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    })
      .then((res) => {
        if (res.ok) {
          setJustModified(true);
          flagModalDisclosure.onClose();
        }
      })
      .catch(console.error);
  };

  return (
    <PageLayout title="Users">
      <Grid
        pos="relative"
        top="-140px"
        display={{ base: "none", md: "grid" }}
        templateColumns={`repeat(${statistics.length}, 1fr)`}
        gap={{ md: "8", lg: "32" }}
      >
        {statistics.map((statistic: Statistic, key: number) => (
          <GridItem key={key}>
            <Card padding="5" alignItems="center" shadow="md">
              <Text fontSize="xl" color="gray.700" margin="0">
                {statistic.caption}
              </Text>
              <Text fontSize="4xl" fontWeight="bold" margin="0">
                {statistic.evaluate(users).toLocaleString()}
              </Text>
            </Card>
          </GridItem>
        ))}
      </Grid>
      <UserModal
        user={selectedUser}
        deleteUser={deleteUser}
        isOpen={userModalDisclosure.isOpen}
        onClose={userModalDisclosure.onClose}
      />
      <FlagModal
        user={selectedUser}
        isOpen={flagModalDisclosure.isOpen}
        onClose={flagModalDisclosure.onClose}
        setFlag={setFlag}
        deleteFlag={deleteFlag}
      />
      <TableContainer
        pos="relative"
        top="-50px"
        w={{ base: "95%", md: "80%" }}
        bgColor="white"
        rounded="xl"
        shadow="md"
      >
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th fontSize="lg">Points</Th>
              <Th fontSize="lg">Name</Th>
              <Th fontSize="lg">Flag</Th>
              <Th fontSize="lg"># Images Seen</Th>
              <Th fontSize="lg">Accuracy</Th>
              <Th fontSize="lg">Avg Reaction Time, Correct</Th>
              <Th fontSize="lg">Avg Reaction Time, Incorrect</Th>
              <Th fontSize="lg">CT Accuracy</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users
              .sort((a: User, b: User) => b.points - a.points)
              .map((user: User, key: number) => (
                <Tr key={key}>
                  <Td>{user.points.toLocaleString()}</Td>
                  <Td>
                    <Link
                      color="rgb(48, 172, 251)"
                      fontWeight="semibold"
                      onClick={() => {
                        setSelectedUser(user);
                        userModalDisclosure.onOpen();
                      }}
                    >
                      {user.username.length < 20
                        ? user.username
                        : user.username.slice(0, 20) + "..."}
                    </Link>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Flag user"
                      icon={<PiFlag />}
                      colorScheme={user.flag ? "red" : "gray"}
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        flagModalDisclosure.onOpen();
                      }}
                    />
                  </Td>
                  <Td>{user.num_total_trials}</Td>
                  <Td>
                    {user.num_total_trials == 0
                      ? 0
                      : (user.num_corr_trials / user.num_total_trials).toFixed(
                          2
                        )}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
};

export default Users;
