from typing import Optional, Dict

from django.core.management.base import BaseCommand

from ...models import OrganizationUser

USERS = [{
    'first_name': 'Mark',
    'last_name': 'Hill',
    'image': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9zc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'designation': 'Chief Executive Officer',
    'country_code': '1',
    'phone_number': '49583033',
    'sub_users': [{
        'first_name': 'Joe',
        'last_name': 'Linux',
        'image': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
        'designation': 'CTO',
        'sub_users': [{
            'first_name': 'Ron',
            'last_name': 'Blomquist',
            'image': 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
            'designation': 'Chief Information Security Officer',
        }, {
            'first_name': 'Michael',
            'last_name': 'Rubin',
            'image': 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
            'designation': 'Chief Innovation Officer',
            'email': 'we@aregreat.com',
        }]
    }, {
        'first_name': 'Linda',
        'last_name': 'May',
        'image': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        'designation': 'Chief Business Officer',
        'sub_users': [{
            'first_name': 'Alice',
            'last_name': 'Lopez',
            'image': 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
            'designation': 'Chief Communications Officer',
        }, {
            'first_name': 'Mary',
            'last_name': 'Johnson',
            'image': 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
            'designation': 'Chief Brand Officer',
        }, {
            'first_name': 'Kirk',
            'last_name': 'Douglas',
            'image': 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
            'designation': 'Chief Business Development Officer',
        }]
    }, {
        'first_name': 'John',
        'last_name': 'Green',
        'image': 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
        'designation': 'Chief Accounting Officer',
        'country_code': '91',
        'phone_number': '8930472210',
        'sub_users': [{
            'first_name': 'Erica',
            'last_name': 'Reel',
            'image': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
            'designation': 'Chief Customer Officer',
        }]
    }]
}]


class Command(BaseCommand):
    help = 'Insert data into users'

    def __create_subusers(self, user: Dict, manager_id: Optional[int]):
        created = OrganizationUser.objects.create(first_name=user['first_name'], last_name=user['last_name'],
                                                  image=user['image'],
                                                  designation=user['designation'],
                                                  country_code=user.get('country_code'),
                                                  phone_number=user.get('phone_number'), email=user.get('email'),
                                                  manager_id=manager_id)
        for sub_user in user.get('sub_users', []):
            self.__create_subusers(sub_user, created.id)

    def handle(self, *args, **options):
        print('Running script to insert data')

        OrganizationUser.objects.all().hard_delete()
        for user in USERS:
            self.__create_subusers(user, None)

        print('Data inserted successfully')
