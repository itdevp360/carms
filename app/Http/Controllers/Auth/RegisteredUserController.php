<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Roles;
use App\Models\Department;
use App\Http\Resources\RoleResource;
use App\Services\RoleService;
use App\Services\DepartmentManagerService;
use App\Services\DepartmentService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    use AuthorizesRequests;

    public function __construct()
    {
        $this->authorize('Processor');
    }
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $roles = Roles::all();
        return Inertia::render('Auth/Register', [
            'success' => session('success'),
            'roles' => RoleResource::collection($roles),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, RoleService $roleService, DepartmentManagerService $managerService, DepartmentService $departmentService): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::min(8)->letters()->symbols()->mixedCase()->numbers()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $department_user = [
            'Consulting' => $request->consulting,
            'IH Lab' => $request->ih_lab,
            'Marketing' => $request->marketing,
            'Top Management' => $request->top_management,
            'ESH' => $request->esh,
            'IH WEM' => $request->ih_wem,
            'OSHMS' => $request->oshms,
            'FAD' => $request->fad,
            'IMS' => $request->ims,
            'Sales' => $request->sales,
            'HR' => $request->hr,
            'IT' => $request->it,
            'Testing' => $request->testing,
        ];

        if($request->role == '2'){
            $role_users = [
                'department_head' => [
                    'value' => $request->dept_head,
                    'role_id' => '2',
                ],
                'approver' => [
                    'value' => $request->appr,
                    'role_id' => '1',
                ],
            ];
            foreach ($role_users as $role_key => $role_user){
                $role_user['value'] ? $user->roles()->attach($role_user['role_id']) : '' ;
            }
            foreach ($department_user as $department => $bool){
                $bool ? $managerService->create($department, $user->id) : "";
            }
        }else{
            // $roleService->create($request->role, $user->id);
            $user->roles()->attach($request->role);
            foreach ($department_user as $department => $bool){
                $bool ? $departmentService->create($department, $user->id) : "";
            }
        }
        
        event(new Registered($user));

        return redirect(route('register'))->with('success', 'User has been created!');
    }
}
